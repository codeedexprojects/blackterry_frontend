import React from "react";
import footericon from '/src/assets/footerlogo.png'

function Footer() {
  return (
    <footer className="bg-white py-4 border-top mt-5">
      <div className="container">
        <div className="row text-center text-md-start align-items-start">
          {/* Logo Section */}
          <div className="col-12 col-md-3 mb-3  mb-md-0 d-flex justify-content-center justify-content-md-start">
            <div className="">
              <img src={footericon} alt="Black Terry" style={{ width: "120px",        
    maxHeight: "60px",      
    objectFit: "contain"     }} />
              {/* <p className="mt-2 fw-semibold fs-5">BLACK TERRY</p> */}
            </div>
          </div>

          {/* First Column */}
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li>Home</li>
              <li>About us</li>
              <li>Contact</li>
              <li>Reviews</li>
            </ul>
          </div>

          {/* Second Column */}
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li>Care</li>
              <li>Exchange portal</li>
              <li>Gift card</li>
            </ul>
          </div>

          {/* Third Column */}
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li>Instagram</li>
              <li>E mail</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <hr />
        <div className="text-center small text-muted" style={{fontSize:"0.8rem", paddingTop:"1rem", color: "#666", border:"1px solid #eee"}}>
        <p>© 2025, Black terry · All Rights Reserved · Refund policy · Privacy policy · Terms of service · Shipping policy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
