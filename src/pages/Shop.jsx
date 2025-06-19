import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import tshirt1 from "/src/assets/tshirt1.jpg";
import tshirt2 from "/src/assets/tshirt2.jpg";
import tshirt3 from "/src/assets/tshirt3.jpg";
import tshirt4 from "/src/assets/tshirt4.jpg";
import tshirt5 from "/src/assets/tshirt5.jpg";
import tshirt6 from "/src/assets/tshirt6.jpg";
import tshirt7 from "/src/assets/tshirt7.jpg";
import tshirt8 from "/src/assets/tshirt8.jpg";
import tshirt9 from "/src/assets/tshirt9.jpg";
import tshirt10 from "/src/assets/tshirt10.jpg";
import tshirt11 from "/src/assets/tshirt11.jpg";
import tshirt12 from "/src/assets/tshirt12.jpg";
import tshirt13 from "/src/assets/tshirt13.jpg";
import tshirt14 from "/src/assets/tshirt14.jpg";
import tshirt15 from "/src/assets/tshirt15.jpg";
import { useNavigate } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import adds from "/src/assets/ads.png";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

const tshirts = [
  {
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },
  {
    name: "Urban Vibes",
    subtitle: "Monochrome Set",
    price: "₹999.00",
    image: tshirt2,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt3,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt4,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt5,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt6,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt7,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt8,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt9,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt10,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt11,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt12,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt13,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt14,
  },
  {
    name: "Sky Blue Shine",
    subtitle: "Edition 1.1",
    price: "₹999.00",
    image: tshirt15,
  },
];

function Shop() {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/details/:id");
  };
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Header />

      <div className="container py-2">
        <div className="row align-items-center g-2">
          {/* Left Side: Filter & Dropdowns */}
          <div className="col-md-8 d-flex flex-wrap align-items-center">
            <h6 className="me-2 mb-0">Filter:</h6>

            <Dropdown className="me-2 mb-0">
              <Dropdown.Toggle variant="" size="sm">
                AVAILABILITY
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Available</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Out of Stock</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mb-0">
              <Dropdown.Toggle variant="" size="sm">
                PRICE
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Low to High</Dropdown.Item>
                <Dropdown.Item href="#/action-2">High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Right Side: Sort & Product Count */}
          <div className="col-md-4 d-flex justify-content-md-end align-items-center flex-wrap">
            <span className="fw-sm me-2">Sort By:</span>

            <Dropdown className="me-2">
              <Dropdown.Toggle variant="" size="sm">
                Availability
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Available</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Out of Stock</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
              50 products
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid px-1">
        <div className="row g-0">
          {tshirts.map((shirt, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 px-1 mb-2">
              <div className="position-relative">
                <img
                  src={shirt.image}
                  alt={shirt.name}
                  className="img-fluid w-100"
                  style={{ height: "400px", objectFit: "cover" }}
                />

                <div
                  className="position-absolute"
                  style={{ bottom: "10px", right: "10px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#5e3b25",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="white"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-2 pb-2">
                <p className="mb-0" style={{ fontWeight: "500" }}>
                  {shirt.name} • {shirt.subtitle}
                </p>
                <p className="mb-0" style={{ fontWeight: "400" }}>
                  {shirt.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid p-0">
        <div
          className="row g-0 justify-content-center"
          style={{ marginBottom: "" }}
        >
          {/* Left side - Product Image (50%) */}
          <div
            className="col-md-6 d-flex justify-content-center align-items-center"
            style={{
              background: "#f8f9fa",
              padding: "40px",
              marginTop: "50px",
            }}
          >
            <div style={{ width: "100%", maxWidth: "350px" }}>
              <img
                src={tshirt1}
                alt="Black T-shirt"
                className="img-fluid"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Right side - Product Details (50%) */}
          <div
            className="col-md-6 d-flex align-items-center"
            style={{ background: "#fff", padding: "40px" }}
          >
            <div
              className="product-details w-100"
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <h1
                className="product-title mb-3"
                style={{ fontSize: "18px", fontWeight: "500", color: "#333" }}
              >
                BLACK & WHITE • RED 911 PATCH
              </h1>

              <div className="price-section mb-4">
                <h2
                  className="price mb-1"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  ₹ 999.00
                </h2>
                <p
                  className="shipping-note text-muted"
                  style={{ fontSize: "12px" }}
                >
                  TAXES INCLUDED. SHIPPING CALCULATED AT CHECKOUT.
                </p>
              </div>

              <div className="size-section mb-4">
                <p
                  className="section-title mb-2"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  SIZE
                </p>
                <div className="size-options d-flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`btn ${
                        selectedSize === size
                          ? "btn-dark"
                          : "btn-outline-secondary"
                      }`}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "0",
                        backgroundColor:
                          selectedSize === size ? "#603913" : "#f5f5f5",
                        border:
                          selectedSize === size ? "none" : "1px solid #e0e0e0",
                        color: selectedSize === size ? "#fff" : "#333",
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-section mb-4">
                <p
                  className="section-title mb-2"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  QUANTITY
                </p>
                <div
                  className="quantity-selector d-flex align-items-center border"
                  style={{ maxWidth: "200px" }}
                >
                  <button
                    className="btn btn-white border-0"
                    onClick={() => handleQuantityChange(1)}
                    style={{ width: "50px", height: "50px", borderRadius: "0" }}
                  >
                    +
                  </button>
                  <input
                    type="text"
                    className="form-control border-0 text-center bg-white"
                    value={quantity}
                    readOnly
                    style={{
                      flex: "1",
                      height: "50px",
                      borderRadius: "0",
                      boxShadow: "none",
                    }}
                  />
                  <button
                    className="btn btn-white border-0"
                    onClick={() => handleQuantityChange(-1)}
                    style={{ width: "50px", height: "50px", borderRadius: "0" }}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Buttons - reduced width */}
              <div
                className="action-buttons mb-3"
                style={{ maxWidth: "300px" }}
              >
                <button
                  className="btn btn-light w-100 py-2 mb-2"
                  style={{
                    borderRadius: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #333",
                  }}
                >
                  ADD TO CART
                </button>
                <button
                  className="btn w-100 py-2 text-white"
                  style={{ backgroundColor: "#603913", borderRadius: "0" }}
                >
                  BUY IT NOW
                </button>
              </div>

              <div className="product-actions d-flex align-items-center justify-content-between">
                <button
                  className="btn btn-link text-dark p-0"
                  style={{ textDecoration: "none", fontSize: "14px" }}
                >
                  <FaShareAlt className="me-2" />
                  Share
                </button>
                <button
                  className="btn btn-link text-dark p-0"
                  onClick={handleDetails}
                  style={{ textDecoration: "none", fontSize: "14px" }}
                >
                  View full details
                  <BsChevronRight className="ms-1" size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center align-items-center">
        <img
          src={adds}
          alt="Banner"
          className="img-fluid"
          style={{ maxWidth: "1512px", objectFit: "contain" }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
