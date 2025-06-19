import React from "react";
import { FaHeart, FaShoppingCart, FaRegCreditCard } from "react-icons/fa";

const ActionButtons = () => {
  return (
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
  );
};

export default ActionButtons;