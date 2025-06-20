import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ShopProductCard = ({ product }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 px-1 mb-2">
      <Link
        to={`/details/${product.id}`}
        className="text-decoration-none text-dark group"
      >
        <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {/* Product Image */}
          <div className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-100 img-fluid transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>

          {/* Heart Icon */}
          <div className="absolute bottom-2 right-2">
            <div className="w-10 h-10 rounded-full bg-[#5e3b25] flex items-center justify-center transition-transform group-hover:scale-110">
              <FaHeart color="white" size={16} />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-2 pb-2 text-center">
          <p className="mb-0 font-medium group-hover:text-[#5e3b25] transition-colors duration-200">
            {product.name} • {product.subtitle}
          </p>
          <p className="mb-0 font-normal text-gray-700">{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ShopProductCard;
