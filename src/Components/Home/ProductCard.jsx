import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 px-1 mb-2">
      <Link
        to={`/details/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <div className="position-relative">
          <img
            src={product.image}
            alt={product.name}
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
              <FaHeart color="white" size={16} />
            </div>
          </div>
        </div>

        <div className="pt-2 pb-2">
          <p className="mb-0" style={{ fontWeight: "500" }}>
            {product.name} • {product.subtitle}
          </p>
          <p className="mb-0" style={{ fontWeight: "400" }}>
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;