import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreditCard, Lock, MapPin, Plus, Check } from "lucide-react";
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
        // Navigate to order confirmation page with order details
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
    const total = subtotal - discount + shipping + taxes;
    return { subtotal, shipping, taxes, discount, total };
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
            <div className="mb-4">
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
            </div>

            {/* Delivery Section */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">Delivery Address</h5>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleAddNewAddress}
                >
                  <Plus size={16} className="me-1" />
                  Add New
                </button>
              </div>

              {addressLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading addresses...</p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-4">
                  <MapPin size={48} className="mb-3 text-muted" />
                  <p>No addresses found</p>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddNewAddress}
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`border rounded p-3 mb-2 cursor-pointer ${selectedAddress?._id === address._id ? 'border-primary bg-light' : ''}`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <div className="d-flex align-items-start">
                        <div className="me-2">
                          {selectedAddress?._id === address._id ? (
                            <Check className="text-primary" size={20} />
                          ) : (
                            <div className="border rounded-circle" style={{ width: '20px', height: '20px' }}></div>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-1">{address.firstName} {address.lastName}</h6>
                            {address.defaultAddress && (
                              <span className="badge bg-light text-dark small">Default</span>
                            )}
                          </div>
                          <p className="small mb-1">{address.address}, {address.area}</p>
                          <p className="small mb-1">{address.landmark}</p>
                          <p className="small mb-1">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="small mb-0">Phone: {address.number}</p>
                          <p className="small mb-0">Address Type: {address.addressType}</p>
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
      <Footer />
    </>
  );
}

export default CheckoutPage;