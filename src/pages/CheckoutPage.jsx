import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreditCard, Lock } from "lucide-react";
import tshirt2 from "/src/assets/tshirt7.jpg";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function CheckoutPage() {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/order");
  };

  const [sameShippingAddress, setSameShippingAddress] = useState(true);
  return (
    <>
      <Header />
      <div
        className="container-fluid mt-5 "
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <div className="row mx-0">
          {/* Left Column - Checkout Form */}
          <div className="col-md-7 p-4 border-end">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold m-0">BLACK TERRY</h2>
              <div>
                <button className="btn border-0">
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
            </div>

            {/* Contact Section */}
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <h5>Contact</h5>
                <span className="text-muted">Log in</span>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
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
              <h5 className="mb-3">Delivery</h5>
              <div className="mb-3">
                <select className="form-select mb-3">
                  <option>India</option>
                </select>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Address"
                />
                <div className="row mb-3">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pin code"
                    />
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City name"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone number"
                />
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="saveInfo"
                />
                <label className="form-check-label small" htmlFor="saveInfo">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mb-4">
              <h5 className="mb-3">Delivery</h5>
              <p className="text-muted small">
                All duties/taxes are included and calculated.
              </p>

              <div className="border rounded p-3 mb-4">
                <div className="d-flex justify-content-between">
                  <span>Secure Payment Gateway (UPI, Cards & NetBanking)</span>
                  <div>
                    <img
                      src="/api/placeholder/60/30"
                      alt="Mastercard"
                      className="me-1"
                      style={{ width: "30px", height: "20px" }}
                    />
                    <img
                      src="/api/placeholder/60/30"
                      alt="Visa"
                      className="me-1"
                      style={{ width: "30px", height: "20px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center border rounded p-4 mb-4">
                <div className="d-flex justify-content-center mb-2">
                  <div className="border rounded p-2">
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

            {/* Billing Address */}
            <div className="mb-4">
              <h5 className="mb-3">Billing address</h5>
              <div className="form-check border rounded p-3 mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressOption"
                  id="sameAddress"
                  checked={sameShippingAddress}
                  onChange={() => setSameShippingAddress(true)}
                />
                <label className="form-check-label w-100" htmlFor="sameAddress">
                  Same as shipping address
                </label>
              </div>
              <div className="form-check border rounded p-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressOption"
                  id="diffAddress"
                  checked={!sameShippingAddress}
                  onChange={() => setSameShippingAddress(false)}
                />
                <label className="form-check-label w-100" htmlFor="diffAddress">
                  Use a different billing address
                </label>
              </div>
            </div>

            {/* Pay Now Button */}
            <div className="mb-4">
              <button
                className="btn btn-dark w-100 py-3"
                onClick={handlePay}
                style={{ backgroundColor: "#50311D" }}
              >
                Pay now
              </button>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="col-md-5 p-4 bg-light">
            <div className="d-flex mb-4">
              <div className="me-3 position-relative">
                <img
                  src={tshirt2}
                  alt="Men's Retro Crew Neck T-shirt"
                  className="rounded"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  1
                </span>
              </div>
              <div className="flex-grow-1">
                <p className="mb-1">Men's Retro Crew Neck T-shirt</p>
                <p className="small text-muted mb-1">Size: L</p>
                <p className="small text-muted">Color: Grey</p>
              </div>
              <div>
                <p className="text-end">₹999</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discount coupon or gift card"
                />
                <button className="btn btn-outline-secondary" type="button">
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
                <span className="text-muted">
                  Taxes and shipping calculated
                </span>
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
        <Footer />
      </div>
    </>
  );
}

export default CheckoutPage;
