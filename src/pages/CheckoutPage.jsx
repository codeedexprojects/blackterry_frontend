import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreditCard, Lock, MapPin, Plus, Check, Home, Building, Star } from "lucide-react";
import tshirt2 from "/src/assets/tshirt7.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { getAddress, getCheckout, placeOrder } from "../services/allApi";

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkoutId } = location.state || {};
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!checkoutId) {
        setError("No checkout ID provided");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const checkoutResponse = await getCheckout(checkoutId);
        setCheckoutData(checkoutResponse.data.checkout);
        if (checkoutResponse.data.checkout.userId?.email) {
          setEmail(checkoutResponse.data.checkout.userId.email);
        }
        const userId = localStorage.getItem('userId');
        if (userId) {
          setAddressLoading(true);
          const addressResponse = await getAddress(userId);
          setAddresses(addressResponse.data || []);
          const defaultAddress = addressResponse.data.find(addr => addr.defaultAddress);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          }
        }
        setError(null);
      } catch (err) {
        setError("Failed to load checkout data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
        setAddressLoading(false);
      }
    };
    fetchData();
  }, [checkoutId]);

  const handlePay = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("Please log in to place an order");
        return;
      }

      const reqBody = {
        userId: userId,
        addressId: selectedAddress._id,
        checkoutId: checkoutId
      };

      const response = await placeOrder(reqBody);

      if (response && response.data) {
        navigate("/order-confirmation", {
          state: {
            orderId: response.data._id,
            orderDetails: response.data
          }
        });
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    navigate("/add-address", {
      state: { fromCheckout: true, checkoutId }
    });
  };

  const calculateTotals = () => {
    if (!checkoutData) return { subtotal: 0, shipping: 0, taxes: 0, total: 0 };
    const subtotal = checkoutData.totalPrice || 0;
    const shipping = 0;
    const taxes = 0;
    const discount = checkoutData.discountedPrice || 0;
    const total = subtotal + shipping + taxes; // Don't subtract discount from total
    return { subtotal, shipping, taxes, discount, total };
  };

  const getAddressIcon = (addressType) => {
    switch (addressType?.toLowerCase()) {
      case 'home':
        return <Home size={16} className="text-primary" />;
      case 'office':
      case 'work':
        return <Building size={16} className="text-success" />;
      default:
        return <MapPin size={16} className="text-muted" />;
    }
  };

  const { subtotal, shipping, taxes, discount, total } = calculateTotals();

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading checkout data...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-3 mt-md-5 px-3 px-md-5">
        <div className="row mx-0">
          {/* Left Column - Checkout Form */}
          <div className="col-lg-7 col-12 p-3 p-md-4 border-end">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold m-0">BLACK TERRY</h2>
              <button className="btn border-0 p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </button>
            </div>

            {/* Contact Section */}
            {/* <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">Contact</h5>
                <span className="text-primary small">Log in</span>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailMe"
                />
                <label className="form-check-label small" htmlFor="emailMe">
                  Email me with news and offers
                </label>
              </div>
            </div> */}

            {/* Delivery Section - Redesigned */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="m-0 d-flex align-items-center">
                  <MapPin size={20} className="me-2" style={{ color: "#50311D" }} />
                  Delivery Address
                </h5>
                <button
                  className="btn d-flex align-items-center px-3 py-2"
                  onClick={handleAddNewAddress}
                  style={{ 
                    backgroundColor: "#50311D", 
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  <Plus size={16} className="me-2" />
                  Add Address
                </button>
              </div>

              {addressLoading ? (
                <div className="text-center py-5" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 mb-0 text-muted">Loading your addresses...</p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-5" style={{ 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "12px",
                  border: "2px dashed #dee2e6"
                }}>
                  <div className="mb-3">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: "60px", 
                        height: "60px", 
                        backgroundColor: "#e9ecef" 
                      }}
                    >
                      <MapPin size={24} className="text-muted" />
                    </div>
                  </div>
                  <h6 className="mb-2">No delivery addresses found</h6>
                  <p className="text-muted mb-3 small">Add your first address to continue with checkout</p>
                  <button
                    className="btn d-flex align-items-center mx-auto px-4 py-2"
                    onClick={handleAddNewAddress}
                    style={{ 
                      backgroundColor: "#50311D", 
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "500"
                    }}
                  >
                    <Plus size={16} className="me-2" />
                    Add Your First Address
                  </button>
                </div>
              ) : (
                <div className="address-container">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className="address-card mb-3"
                      onClick={() => handleAddressSelect(address)}
                      style={{
                        border: selectedAddress?._id === address._id ? "2px solid #50311D" : "1px solid #dee2e6",
                        borderRadius: "12px",
                        padding: "20px",
                        cursor: "pointer",
                        backgroundColor: selectedAddress?._id === address._id ? "#f8f5f3" : "white",
                        transition: "all 0.3s ease",
                        position: "relative"
                      }}
                    >
                      {/* Selection indicator */}
                      <div 
                        className="position-absolute"
                        style={{ top: "15px", right: "15px" }}
                      >
                        {selectedAddress?._id === address._id ? (
                          <div 
                            className="d-flex align-items-center justify-content-center rounded-circle"
                            style={{ 
                              width: "24px", 
                              height: "24px", 
                              backgroundColor: "#50311D" 
                            }}
                          >
                            <Check size={14} className="text-white" />
                          </div>
                        ) : (
                          <div 
                            className="rounded-circle"
                            style={{ 
                              width: "24px", 
                              height: "24px", 
                              border: "2px solid #dee2e6" 
                            }}
                          ></div>
                        )}
                      </div>

                      {/* Address content */}
                      <div className="row">
                        <div className="col-12">
                          {/* Header with name and badges */}
                          <div className="d-flex align-items-center mb-2">
                            {getAddressIcon(address.addressType)}
                            <h6 className="mb-0 ms-2 me-3 fw-semibold">
                              {address.firstName} {address.lastName}
                            </h6>
                            <div className="d-flex gap-2">
                              {address.defaultAddress && (
                                <span 
                                  className="badge d-flex align-items-center"
                                  style={{ 
                                    backgroundColor: "#50311D", 
                                    color: "white",
                                    fontSize: "10px",
                                    padding: "4px 8px"
                                  }}
                                >
                                  <Star size={10} className="me-1" />
                                  Default
                                </span>
                              )}
                              <span 
                                className="badge"
                                style={{ 
                                  backgroundColor: address.addressType?.toLowerCase() === 'home' ? "#e7f3ff" : "#f0f9ff",
                                  color: address.addressType?.toLowerCase() === 'home' ? "#0066cc" : "#0080ff",
                                  fontSize: "10px",
                                  padding: "4px 8px"
                                }}
                              >
                                {address.addressType}
                              </span>
                            </div>
                          </div>

                          {/* Address details */}
                          <div className="text-muted" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                            <p className="mb-1">{address.address}</p>
                            <p className="mb-1">{address.area}, {address.landmark}</p>
                            <p className="mb-2">{address.city}, {address.state} - {address.pincode}</p>
                            <p className="mb-0">
                              <strong>Phone:</strong> {address.number}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="mb-4">
              <h5 className="mb-3">Payment</h5>
              <p className="text-muted small mb-3">
                All duties/taxes are included and calculated.
              </p>

              <div className="border rounded p-3 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Secure Payment Gateway (UPI, Cards & NetBanking)</span>
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                      alt="Mastercard"
                      className="me-1"
                      style={{ width: "30px", height: "20px" }}
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="Visa"
                      className="me-1"
                      style={{ width: "30px", height: "20px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center border rounded p-4 mb-4 bg-light">
                <div className="d-flex justify-content-center mb-2">
                  <div className="border rounded p-2 bg-white">
                    <CreditCard size={24} />
                  </div>
                </div>
                <p className="small mb-1">
                  After placing your order, you will be redirected to
                </p>
                <p className="small mb-1">
                  Payment Gateway (UPI, Cards & NetBanking) to complete
                </p>
                <p className="small">your purchase securely</p>
              </div>
            </div>

            {/* Pay Now Button */}
            <div className="mb-4">
              <button
                className="btn btn-dark w-100 py-3 fw-bold"
                onClick={handlePay}
                style={{ backgroundColor: "#50311D" }}
              >
                Pay now
              </button>
              <div className="d-flex justify-content-center align-items-center mt-2 text-muted small">
                <Lock size={14} className="me-1" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="col-lg-5 col-12 p-3 p-md-4 bg-light">
            <div className="sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-4">Order Summary</h5>

              {/* Dynamic Cart Items */}
              {checkoutData?.cartItems?.map((item, index) => (
                <div key={item._id || index} className="d-flex mb-4">
                  <div className="me-3 position-relative">
                    <img
                      src={item.productId.images?.[0] || tshirt2}
                      alt={item.productId.title}
                      className="rounded"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark border">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-medium">{item.productId.title}</p>
                    <p className="small text-muted mb-1">Size: {item.size}</p>
                    <p className="small text-muted">Color: {item.color}</p>
                  </div>
                  <div>
                    <p className="text-end fw-medium">₹{item.price}</p>
                  </div>
                </div>
              ))}
              <div className="border-top pt-3 mb-2">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span className="text-success">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Taxes</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between">
                  <h5>Total</h5>
                  <h5>₹{total.toFixed(2)}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional styling */}
      <style jsx>{`
        .address-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .address-container {
          max-height: 400px;
          overflow-y: auto;
          padding-right: 8px;
        }
        
        .address-container::-webkit-scrollbar {
          width: 4px;
        }
        
        .address-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .address-container::-webkit-scrollbar-thumb {
          background: #50311D;
          border-radius: 4px;
        }
        
        .address-container::-webkit-scrollbar-thumb:hover {
          background: #3d2517;
        }
      `}</style>
      
      <Footer />
    </>
  );
}

export default CheckoutPage;