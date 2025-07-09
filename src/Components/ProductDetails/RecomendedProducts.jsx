import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/allApi";

const RecommendedProducts = () => {
  const { id } = useParams(); // Get the current product ID from URL params
  const navigate = useNavigate(); // For navigation
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await getProducts();
        
        if (response && response.data) {
          // Filter out the current product and limit to 4 recommended products
          const recommended = response.data
            .filter(product => product._id !== id)
            .slice(0, 4);
          
          setProducts(recommended);
        }
      } catch (err) {
        console.error("Failed to fetch recommended products:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [id]);

  const handleProductClick = (productId) => {
    navigate(`/details/${productId}`);
  };

  if (loading) {
    return (
      <div className="recommended-section mt-5 pt-4 border-top">
        <h3 className="mb-4 fw-bold text-center text-md-start">
          FIND YOUR NEXT FAVORITE TEE
        </h3>
        <div className="row g-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="card border-0 h-100">
                <div className="position-relative overflow-hidden rounded bg-light" 
                  style={{ aspectRatio: "1/1" }}></div>
                <div className="card-body px-0 pb-0">
                  <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommended-section mt-5 pt-4 border-top">
        <h3 className="mb-4 fw-bold text-center text-md-start">
          FIND YOUR NEXT FAVORITE TEE
        </h3>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Don't render if no recommended products
  }

  return (
    <div className="recommended-section mt-5 pt-4 border-top">
      <h3 className="mb-4 fw-bold text-center text-md-start">
        FIND YOUR NEXT FAVORITE TEE
      </h3>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-6 col-md-3">
            <div 
              className="card border-0 h-100 cursor-pointer"
              onClick={() => handleProductClick(product._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="position-relative overflow-hidden rounded">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/300x300.png?text=No+Image"}
                  alt={product.title}
                  className="card-img-top"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
                {product.isOfferProduct && product.discount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="card-body px-0 pb-0">
                <h6 className="card-title fw-bold mb-1">{product.title}</h6>
                <div className="d-flex align-items-center gap-2">
                  {product.offerPrice ? (
                    <>
                      <p className="card-text fw-bold text-dark mb-0">
                        ₹{product.offerPrice.toFixed(2)}
                      </p>
                      <p className="card-text text-muted text-decoration-line-through mb-0 small">
                        ₹{product.actualPrice}
                      </p>
                    </>
                  ) : (
                    <p className="card-text fw-bold text-dark mb-0">
                      ₹{product.actualPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;