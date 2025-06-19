import React, { useState } from "react";
import tshirt1 from "../../assets/tshirt1.jpg";


const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="w-full">
        <img
          src={tshirt1}
          alt="T-shirt"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">BLACK & WHITE • RED 911 PATCH</h2>
        <p className="text-2xl font-bold">₹ 999.00</p>
        <p className="text-sm text-gray-500 uppercase">
          Taxes included. Shipping calculated at checkout.
        </p>

        {/* Size selector */}
        <div>
          <h3 className="mb-2 font-medium">Size</h3>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border ${
                  selectedSize === size
                    ? "bg-[#6C4A2A] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity selector */}
        <div>
          <h3 className="mb-2 font-medium">Quantity</h3>
          <div className="flex items-center border w-max">
            <button
              onClick={() => handleQuantityChange("dec")}
              className="px-4 py-2 text-xl"
            >
              –
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("inc")}
              className="px-4 py-2 text-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button className="w-full border py-2 font-medium hover:bg-gray-100 transition">
            ADD TO CART
          </button>
          <button className="w-full bg-[#6C4A2A] text-white py-2 font-medium hover:opacity-90 transition">
            BUY IT NOW
          </button>
        </div>

        {/* Footer actions */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>Share</span>
          <span className="flex items-center gap-1">
            View full details <span className="text-xl">{">"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
