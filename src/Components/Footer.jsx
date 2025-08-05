import React from "react";
import footericon from "/src/assets/footerlogo.png";

function Footer() {
  return (
    <footer className="bg-white py-4  mt-5">
      <div className="container">
        <div className="row text-center text-md-start align-items-start">
          {/* Logo Section */}
          <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <div>
              <img
                src={footericon}
                alt="Black Terry"
                style={{
                  width: "180px",
                  maxHeight: "80px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* First Column */}
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-dark">Home</a></li>
              <li><a href="/shop" className="text-decoration-none text-dark">Shop</a></li>
              <li><a href="/about" className="text-decoration-none text-dark">AboutUs</a></li>
              <li><a href="/contact" className="text-decoration-none text-dark">Contact</a></li>
            </ul>
          </div>

          {/* Second Column */}
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="/cart" className="text-decoration-none text-dark">Cart</a></li>
              <li><a href="/wishlist" className="text-decoration-none text-dark">Wishlist</a></li>
              <li><a href="/profile" className="text-decoration-none text-dark">Profile</a></li>
            </ul>
          </div>

          {/* Third Column */}
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-dark">Instagram</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Email</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <hr />
        <div
          className="text-center small"
          style={{
            fontSize: "0.8rem",
            paddingTop: "1rem",
            color: "#666",
           
          }}
        >
          <p>
            © 2025, Black Terry · All Rights Reserved ·{" "}
            <a href="/cancellation" className="text-decoration-none text-muted">Refund policy</a> ·{" "}
            <a href="/privacy" className="text-decoration-none text-muted">Privacy policy</a> ·{" "}
            <a href="/terms" className="text-decoration-none text-muted">Terms of service</a> ·{" "}
            <a href="/shipping" className="text-decoration-none text-muted">Shipping policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
