import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
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
  );
};

export default QuantitySelector;