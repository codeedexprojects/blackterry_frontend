import React, { useState } from "react";
import tshirt8 from "/src/assets/tshirt8.jpg";
import tshirt9 from "/src/assets/tshirt9.jpg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function Wishlist() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const [wishlistItems, setWishlistItems] = useState([
    // {
    //   id: 1,
    //   name: "Men's Retro Crew Neck T shirt",
    //   price: 999,
    //   originalPrice: 1999,
    //   size: 'S',
    //   image: tshirt8
    // },
    // {
    //   id: 2,
    //   name: "Men's Retro Crew Neck T shirt",
    //   price: 999,
    //   originalPrice: 1999,
    //   size: 'S',
    //   image: tshirt9
    // }
  ]);

  return (
    <>
      <Header />
      <div className="container py-5">
        {" "}
        {/* Adds top & bottom spacing */}
        {wishlistItems.length === 0 ? (
          <div
            className="d-flex flex-column align-items-center text-center"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            <h2 className="fw-large mb-4">YOUR WISHLIST IS EMPTY</h2>
            <a
              href="/shop"
              className="text-decoration-none mb-3"
              style={{
                backgroundColor: "#50311D",
                padding: "10px",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Continue shopping
            </a>
            <p className="text-muted small mb-2">HAVE AN ACCOUNT?</p>
            <p className="fw-small" style={{ cursor: "pointer" }}>
              <span
                onClick={handleLogin}
                style={{ textDecoration: "underline", color: "#50311D" }}
              >
                LOGIN
              </span>
              TO CHECK OUT FASTER
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Your Wishlist</h4>
              <a
                href="/shop"
                style={{
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                  color: "gray",
                }}
              >
                Continue Shopping
              </a>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {wishlistItems.map((item) => (
                <div
                  className="col d-flex justify-content-center"
                  key={item.id}
                >
                  <div
                    className="card h-100 shadow-sm"
                    style={{ width: "260px" }}
                  >
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: "340px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <p
                          className="card-title mb-1"
                          style={{ fontSize: "0.95rem", fontWeight: "500" }}
                        >
                          {item.name}
                        </p>
                        <p className="mb-1">
                          ₹{item.price}{" "}
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#888",
                              fontSize: "0.85rem",
                            }}
                          >
                            ₹{item.originalPrice}
                          </span>
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "#666" }}>
                          Size: {item.size}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#50311D", color: "white" }}
                        >
                          Add to cart
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Placeholder */}
              <div className="col d-flex justify-content-center">
                <div
                  className="card h-100 d-flex justify-content-center align-items-center"
                  style={{
                    width: "260px",
                    height: "420px",
                    border: "1px dashed #ccc",
                    backgroundColor: "#f8f9fa",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "2rem", color: "#999" }}>+</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
