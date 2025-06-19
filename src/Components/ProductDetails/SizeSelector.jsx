import React, { useState } from "react";

const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = ["M", "L", "XL", "XXL"];

  return (
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
  );
};

export default SizeSelector;