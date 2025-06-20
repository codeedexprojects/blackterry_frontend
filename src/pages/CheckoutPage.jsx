import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreditCard, Lock, MapPin, Plus, Check } from "lucide-react";
import tshirt2 from "/src/assets/tshirt7.jpg";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function CheckoutPage() {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // Sample existing addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      phone: "9876543210",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe",
      street: "456 Park Avenue",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      phone: "9876543210",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  const handlePay = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    navigate("/order");
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    const newId = addresses.length + 1;
    setAddresses([...addresses, { ...newAddress, id: newId, isDefault: false }]);
    setSelectedAddress(newId);
    setShowAddAddressForm(false);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    });
  };

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
                  onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                >
                  <Plus size={16} className="me-1" />
                  Add New
                </button>
              </div>

              {showAddAddressForm && (
                <div className="border rounded p-3 mb-3">
                  <h6 className="mb-3">Add New Address</h6>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pin Code"
                        value={newAddress.zip}
                        onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleAddAddress}
                  >
                    Save Address
                  </button>
                </div>
              )}

              <div className="mb-3">
                {addresses.map((address) => (
                  <div 
                    key={address.id} 
                    className={`border rounded p-3 mb-2 cursor-pointer ${selectedAddress?.id === address.id ? 'border-primary bg-light' : ''}`}
                    onClick={() => handleAddressSelect(address)}
                  >
                    <div className="d-flex align-items-start">
                      <div className="me-2">
                        {selectedAddress?.id === address.id ? (
                          <Check className="text-primary" size={20} />
                        ) : (
                          <div className="border rounded-circle" style={{width: '20px', height: '20px'}}></div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-1">{address.name}</h6>
                          {address.isDefault && (
                            <span className="badge bg-light text-dark small">Default</span>
                          )}
                        </div>
                        <p className="small mb-1">{address.street}</p>
                        <p className="small mb-1">{address.city}, {address.state} - {address.zip}</p>
                        <p className="small mb-0">Phone: {address.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
            <div className="sticky-top" style={{top: '20px'}}>
              <h5 className="mb-4">Order Summary</h5>
              
              <div className="d-flex mb-4">
                <div className="me-3 position-relative">
                  <img
                    src={tshirt2}
                    alt="Men's Retro Crew Neck T-shirt"
                    className="rounded"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark border">
                    1
                  </span>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-1 fw-medium">Men's Retro Crew Neck T-shirt</p>
                  <p className="small text-muted mb-1">Size: L</p>
                  <p className="small text-muted">Color: Grey</p>
                </div>
                <div>
                  <p className="text-end fw-medium">₹999</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Discount code"
                  />
                  <button className="btn btn-outline-dark" type="button">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-top pt-3 mb-2">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹999.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Taxes</span>
                  <span>₹0.00</span>
                </div>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between">
                  <h5>Total</h5>
                  <h5>₹999.00</h5>
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