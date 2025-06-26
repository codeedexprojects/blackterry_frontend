import React from "react";

// Dummy T-shirt product data
const dummyProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: "₹499",
    image: "https://via.placeholder.com/300x300.png?text=White+T-Shirt",
  },
  {
    id: 2,
    name: "Black Oversized Tee",
    price: "₹599",
    image: "https://via.placeholder.com/300x300.png?text=Black+T-Shirt",
  },
  {
    id: 3,
    name: "Graphic Streetwear Tee",
    price: "₹699",
    image: "https://via.placeholder.com/300x300.png?text=Graphic+Tee",
  },
  {
    id: 4,
    name: "Vintage Wash Tee",
    price: "₹649",
    image: "https://via.placeholder.com/300x300.png?text=Vintage+T-Shirt",
  },
 
];

const RecommendedProducts = ({ products = dummyProducts }) => {
  return (
    <div className="recommended-section mt-5 pt-4 border-top">
      <h3 className="mb-4 fw-bold text-center text-md-start">
        FIND YOUR NEXT FAVORITE TEE
      </h3>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-md-3">
            <div className="card border-0 h-100">
              <div className="position-relative overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
              <div className="card-body px-0 pb-0">
                <h6 className="card-title fw-bold mb-1">{product.name}</h6>
                <p className="card-text fw-bold text-dark mb-0">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
