import React, { useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { getWishlist, removeWishlist } from "../services/allApi";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingItems, setRemovingItems] = useState(new Set());

  const handleLogin = () => {
    navigate("/login");
  };

  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await getWishlist(userId);
        if (response && response.data) {
          const transformedItems = response.data.items.map(item => ({
            id: item._id,
            productId: item.productId._id,
            name: item.productId.title,
            price: item.productId.actualPrice,
            originalPrice: item.productId.actualPrice + (item.productId.actualPrice * (item.productId.discount / 100)),
            description: item.productId.description,
            images: item.productId.images,
            colors: item.productId.colors,
            features: item.productId.features,
            addedAt: item.addedAt
          }));
          setWishlistItems(transformedItems);
        }
      } catch (err) {
        setError('Failed to fetch wishlist');
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveItem = async (productId, itemId) => {
    try {
      const userId = getUserId();
      if (!userId) {
        alert('Please login to manage your wishlist');
        return;
      }

      setRemovingItems(prev => new Set([...prev, itemId]));

      const reqBody = new FormData();
      reqBody.append('userId', userId);
      reqBody.append('productId', productId);

      const response = await removeWishlist(reqBody);
      
      if (response && response.status === 200) {
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (err) {
      setError('Failed to remove item from wishlist');
      console.error('Error removing item:', err);
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  // Add to cart handler (you'll need to implement this based on your cart API)
  const handleAddToCart = (item) => {
    // Implement add to cart functionality
    console.log('Add to cart:', item);
    // You can add your cart API call here
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
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
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2 style={{ fontWeight: "400", fontSize: "2rem" }}>Your Wishlist</h2>
              <a
                href="/shop"
                style={{
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                  color: "#888",
                }}
              >
                Continue shopping
              </a>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {wishlistItems.map((item) => (
                <div className="col" key={item.id}>
                  <div style={{ width: "100%", maxWidth: "280px" }}>
                    {/* Product Image */}
                    <div 
                      style={{ 
                        width: "100%", 
                        height: "320px", 
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #e9ecef",
                        marginBottom: "15px",
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      <img
                        src={item.images && item.images.length > 0 ? item.images[0] : '/src/assets/placeholder.jpg'}
                        alt={item.name}
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover" 
                        }}
                        onError={(e) => {
                          e.target.src = '/src/assets/placeholder.jpg';
                        }}
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div>
                      <h6 
                        style={{ 
                          fontWeight: "400", 
                          fontSize: "0.95rem", 
                          marginBottom: "8px",
                          color: "#333"
                        }}
                      >
                        {item.name}
                      </h6>
                      
                      <div style={{ marginBottom: "8px" }}>
                        <span style={{ fontWeight: "500", fontSize: "1rem", color: "#333" }}>
                          ₹{item.price}
                        </span>
                        {item.originalPrice !== item.price && (
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#888",
                              fontSize: "0.9rem",
                              marginLeft: "8px"
                            }}
                          >
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Size info */}
                      {item.colors && item.colors.length > 0 && (
                        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "15px" }}>
                          SIZE: {item.colors[0].sizes && item.colors[0].sizes.length > 0 ? 
                            item.colors[0].sizes.map(s => s.size).join(', ') : 'S'}
                        </p>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="d-flex gap-2">
                        <button
                          style={{
                            backgroundColor: "#50311D",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            fontSize: "0.85rem",
                            flex: "1"
                          }}
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to cart
                        </button>
                        <button 
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #ddd",
                            padding: "8px 10px",
                            fontSize: "0.9rem",
                          }}
                          onClick={() => handleRemoveItem(item.productId, item.id)}
                          disabled={removingItems.has(item.id)}
                        >
                          {removingItems.has(item.id) ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <RiDeleteBin6Fill style={{ color: "#666" }} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Placeholder */}
              <div className="col">
                <div 
                  style={{ 
                    width: "100%", 
                    maxWidth: "280px",
                    height: "320px",
                    border: "2px dashed #ddd",
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onClick={() => navigate('/shop')}
                >
                  <div style={{ fontSize: "3rem", color: "#ccc", fontWeight: "300" }}>+</div>
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