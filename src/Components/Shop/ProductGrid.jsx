import React from "react";
import ProductCard from "./ProductCard";

const ShopProductGrid = ({ products }) => {
  return (
    <div className="container-fluid px-1">
      <div className="row g-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopProductGrid;