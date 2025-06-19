import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaHeart, FaMinus, FaPlus, FaShoppingCart, FaTruck, FaRegCreditCard,} from "react-icons/fa";
import Footer from '/src/Components/Footer'
import { IoMdInformationCircleOutline } from "react-icons/io";
import fullimge from "/src/assets/fullimge.jpg";
import neck from "/src/assets/neck.jpg";
import size from "/src/assets/size.jpg";
import stich from "/src/assets/stich.jpg";
import shirt11 from "/src/assets/tshirt15.jpg";
import shirt12 from "/src/assets/tshirt3.jpg";
import shirt13 from "/src/assets/tshirt14.jpg";
import shirt14 from "/src/assets/tshirt15.jpg";
import Header from "/src/Components/Header";
import RecommendedProducts from "../Components/ProductDetails/RecomendedProducts";

function Details() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");

  const colors = [
    { name: "black", hex: "#000000" },
    { name: "grey", hex: "#808080" },
    { name: "lightgrey", hex: "#D3D3D3" },
  ];

  const sizes = ["M", "L", "XL", "XXL"];

  const recommendedProducts = [
    {
      id: 1,
      name: "CoolFit T-Shirt",
      price: "₹799",
      image: shirt11,
    },
    {
      id: 2,
      name: "BreezeWear Tee",
      price: "₹899",
      image: shirt12,
    },
    {
      id: 3,
      name: "Urban Classic",
      price: "₹1099",
      image: shirt13,
    },
    {
      id: 4,
      name: "Graphix Printed Tee",
      price: "₹999",
      image: shirt14,
    },
  ];

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row gx-4">
          {/* Left side - Product Images */}
          <div className="col-md-1 d-none d-md-block">
            <div className="d-flex flex-column gap-3">
              {[fullimge, neck, size, stich].map((img, idx) => (
                <div key={idx} className="border rounded overflow-hidden" style={{ cursor: "pointer", aspectRatio: "1/1" }}>
                  <img
                    src={img}
                    alt={`Small view ${idx + 1}`}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Product Image */}
          <div className="col-md-5">
            <div className="position-sticky" style={{ top: "20px" }}>
              <div className="border rounded overflow-hidden">
                <img src={fullimge} alt="Main Product" className="img-fluid w-100" />
              </div>
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="col-md-6">
            <div className="product-details">
              <h1 className="fw-bold mb-3 fs-3">
                Men's Retro Color Crew Neck T-shirt Casual Cotton
              </h1>

              <div className="price-section mb-4">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <span className="current-price fw-bold fs-2 text-dark">₹999</span>
                  <span className="original-price text-decoration-line-through text-muted fs-5">
                    ₹1499
                  </span>
                  <span className="badge bg-success fs-6 d-inline-flex align-items-center gap-1">
                    <IoMdInformationCircleOutline />
                    Save 33% right now
                  </span>
                </div>
              </div>

              <div className="color-section mb-4">
                <h5 className="fw-bold mb-3">Colors</h5>
                <div className="d-flex gap-3">
                  {colors.map((color) => (
                    <div
                      key={color.name}
                      className={`position-relative ${
                        selectedColor === color.name
                          ? "border border-3 border-dark rounded-circle p-1"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      <div
                        className="rounded-circle"
                        style={{
                          backgroundColor: color.hex,
                          width: "32px",
                          height: "32px",
                          border: color.name === "lightgrey" ? "1px solid #ddd" : "none"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="size-section mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Select Size</h5>
                  <a href="/size-chart" className="text-decoration-underline text-muted small">
                    Size Chart
                  </a>
                </div>
                <div className="d-flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`btn ${
                        selectedSize === size 
                          ? "btn-dark" 
                          : "btn-outline-secondary"
                      } d-flex justify-content-center align-items-center`}
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-section mb-4">
                <h5 className="fw-bold mb-3">Quantity</h5>
                <div className="d-flex align-items-center border rounded" style={{ width: "140px" }}>
                  <button
                    className="btn btn-light border-0 d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <FaMinus size={12} />
                  </button>
                  <div className="flex-grow-1 text-center py-2 fw-bold">
                    {quantity}
                  </div>
                  <button
                    className="btn btn-light border-0 d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => handleQuantityChange(1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="action-buttons mb-3">
                <div className="d-flex gap-3 mb-3">
                  <button
                    className="btn text-white py-3 px-4 flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: "#50311D" }}
                  >
                    <FaShoppingCart />
                    Add to cart
                  </button>
                  <button className="btn btn-outline-dark py-3 px-3 d-flex align-items-center justify-content-center">
                    <FaHeart />
                  </button>
                </div>

                <button
                  className="btn text-white w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: "#50311D" }}
                >
                  <FaRegCreditCard />
                  Buy it now
                </button>
              </div>

              {/* Product Description */}
              <div className="product-description mb-4 p-3 bg-light rounded">
                <p className="text-muted mb-0 small">
                  Inspired by the divine, crafted for the bold. Elevate your presence with celestial power. Be the hue
                </p>
              </div>

              {/* Accordion Sections */}
              <div className="accordion accordion-flush mb-4" id="productAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Product Specifications
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled mb-0">
                        <li><strong>Material:</strong> 100% Cotton</li>
                        <li><strong>Fit:</strong> Regular</li>
                        <li><strong>Sleeve:</strong> Short</li>
                        <li><strong>Neckline:</strong> Crew Neck</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Shipping & Return
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled mb-0">
                        <li>✓ Free shipping on orders above ₹999</li>
                        <li>✓ 30-day return policy</li>
                        <li>✓ Easy returns and exchanges</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Wash Care
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                    <div className="accordion-body">
                      <ul className="list-unstyled mb-0">
                        <li>• Machine wash cold</li>
                        <li>• Do not bleach</li>
                        <li>• Tumble dry low</li>
                        <li>• Iron on low heat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <div className="d-flex align-items-center gap-2 mb-2 small text-muted">
                  <FaTruck />
                  <span>Free shipping in 2-3 business days</span>
                </div>
                <p className="small text-muted mb-3">Handcrafted with care, made from the heart</p>
                
                <div className="alert alert-light border-0 p-2">
                  <small className="text-muted d-flex align-items-start gap-2">
                    <IoMdInformationCircleOutline className="mt-1 flex-shrink-0" />
                    <span>
                      <strong>Color Disclaimer:</strong> Actual product colors may vary slightly due to different screen resolutions and lighting conditions.
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
         <RecommendedProducts products={recommendedProducts} />
      </div>
      <Footer />
    </>
  );
}

export default Details;