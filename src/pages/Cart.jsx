import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { createCheckout, deletCart, getCart, updateCart } from "../services/allApi";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchCartData = async () => {
      if (!userId || !userToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getCart(userId);
        const cart = response.data;
        setCartData(cart);

        const transformedItems = cart.items.map(item => ({
          id: item._id,
          name: item.productId.title,
          price: item.price,
          originalPrice: item.productId.actualPrice,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.productId.images?.[0] || "/src/assets/shirt1.jpg",
          productId: item.productId._id,
          features: item.features
        }));

        setCartItems(transformedItems);
      } catch (err) {
        setError("Failed to load cart data");
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId, userToken]);

  const handleLogin = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId'); 
    const reqBody = {
      userId: userId, // payload for API
    }
    try {
      const response = await createCheckout(reqBody);
      if (response && response.status === 201) {
         const checkoutId = response.data.checkoutId;
         navigate("/checkout", {
        state: {
          checkoutId: checkoutId,
        },
      });
      } else {
        console.error('Checkout creation failed:', response);
      }
    } catch (err) {
      console.error('Error during checkout:', err);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    setUpdatingItems(prev => new Set([...prev, id]));

    try {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));

      const reqBody = {
        userId: userId,
        productId: item.productId,
        quantity: newQuantity,
        color: item.color,
        size: item.size
      };

      const response = await updateCart(reqBody);

      if (!response || response.status !== 200) {
        throw new Error('Failed to update cart');
      }

    } catch (error) {
      console.error("Error updating quantity:", error);

      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity } : item
      ));

      setError("Failed to update item quantity. Please try again.");

      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const removeItem = async (id) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    setUpdatingItems(prev => new Set([...prev, id]));

    try {
      setCartItems(cartItems.filter(item => item.id !== id));

      const productData = {
        userId: userId,
        productId: item.productId,
        color: item.color,
        size: item.size
      };

      const response = await deletCart(productData);

      if (!response || response.status !== 200) {
        throw new Error('Failed to remove item');
      }

    } catch (error) {
      console.error("Error removing item:", error);

      setCartItems(prevItems => [...prevItems, item].sort((a, b) => a.id.localeCompare(b.id)));

      setError("Failed to remove item. Please try again.");

      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your cart...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h3 className="text-danger mb-3">Error</h3>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if user is not logged in
  if (!userId || !userToken) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1">
          <div className="container my-4 px-3 px-md-4">
            <LoginPrompt handleLogin={handleLogin} handleRegister={handleRegister} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <div className="container my-4 px-3 px-md-4">
          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2 className="fw-bold mb-3 mb-md-0">Your Cart</h2>
                <a href="/shop" className="text-decoration-none text-muted small">
                  Continue shopping
                </a>
              </div>

              {/* Desktop Table Header (hidden on mobile) */}
              <div className="d-none d-md-flex justify-content-between text-uppercase small border-bottom pb-2 mb-3">
                <div className="w-50">Product</div>
                <div className="w-25 text-center">Quantity</div>
                <div className="w-25 text-end">Total</div>
              </div>

              {/* Cart Items */}
              <div className="mb-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    isUpdating={updatingItems.has(item.id)}
                  />
                ))}
              </div>

              {/* Summary Section */}
              <div className="border-top pt-4">
                <div className="row justify-content-end">
                  <div className="col-md-6 col-lg-5">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span className="text-success">FREE</span>
                    </div>
                    {cartData?.coupenAmount > 0 && (
                      <div className="d-flex justify-content-between mb-2">
                        <span>Coupon Discount:</span>
                        <span className="text-success">-₹{cartData.coupenAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                      <span>Estimated Total:</span>
                      <span>₹{(subtotal - (cartData?.coupenAmount || 0)).toFixed(2)}</span>
                    </div>
                    <p className="text-muted small mb-3">
                      Taxes included. Discounts and shipping calculated at checkout
                    </p>
                    <button
                      className="btn w-100 py-2 text-white"
                      style={{ backgroundColor: "#50311D" }}
                      onClick={handleCheckout}
                    >
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Login Prompt Component
const LoginPrompt = ({ handleLogin, handleRegister }) => (
  <div className="d-flex flex-column align-items-center text-center py-5 my-5">
    <h2 className="fw-bold mb-4">PLEASE LOGIN TO VIEW YOUR CART</h2>
    <button
      onClick={handleLogin}
      className="btn text-white mb-3"
      style={{
        backgroundColor: "#50311D",
        padding: "10px 20px",
        borderRadius: "10px",
      }}
    >
      Login Now
    </button>
    <p className="text-muted small mb-2">New to our store?</p>
    <p className="small">
      <span
        onClick={handleRegister}
        className="text-decoration-underline"
        style={{ color: "#50311D", cursor: "pointer" }}
      >
        CREATE AN ACCOUNT
      </span>
    </p>
  </div>
);

const EmptyCart = () => (
  <div className="d-flex flex-column align-items-center text-center py-5 my-5">
    <h2 className="fw-bold mb-4">YOUR CART IS EMPTY</h2>
    <a
      href="/shop"
      className="btn text-white mb-3"
      style={{
        backgroundColor: "#50311D",
        padding: "10px 20px",
        borderRadius: "10px",
      }}
    >
      Continue shopping
    </a>
  </div>
);

// Reusable Cart Item Component
const CartItem = ({ item, updateQuantity, removeItem, isUpdating }) => (
  <div className={`border-bottom pb-3 mb-3 ${isUpdating ? 'opacity-50' : ''}`}>
    <div className="row">
      {/* Product Image and Info */}
      <div className="col-12 col-md-6 mb-3 mb-md-0">
        <div className="d-flex gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="rounded"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = "/src/assets/shirt1.jpg"; // fallback image
            }}
          />
          <div>
            <h6 className="fw-semibold mb-1">{item.name}</h6>
            <p className="mb-1 fw-bold">
              ₹{item.price}
              {item.originalPrice > item.price && (
                <del className="text-muted fw-normal ms-2">₹{item.originalPrice}</del>
              )}
            </p>
            <p className="mb-1 small">SIZE: {item.size}</p>
            <p className="mb-2 small">COLOR: {item.color}</p>
            {item.features && (
              <div className="mb-2">
                <p className="mb-0 small text-muted">
                  {item.features.material} • {item.features.fit} Fit • {item.features.sleevesType}
                </p>
              </div>
            )}
            <div className="d-md-none">
              <QuantityControls
                quantity={item.quantity}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onRemove={() => removeItem(item.id)}
                disabled={isUpdating}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Controls (Desktop) */}
      <div className="col-md-3 d-none d-md-flex align-items-center justify-content-center">
        <QuantityControls
          quantity={item.quantity}
          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
          onRemove={() => removeItem(item.id)}
          disabled={isUpdating}
        />
      </div>

      {/* Total Price */}
      <div className="col-md-3 d-none d-md-flex align-items-center justify-content-end">
        <p className="fw-bold mb-0">₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>

    {/* Mobile Total Price */}
    <div className="row d-md-none mt-2">
      <div className="col-12 d-flex justify-content-between align-items-center">
        <span className="fw-bold">Item Total:</span>
        <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>

    {/* Loading indicator for updating items */}
    {isUpdating && (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Updating...</span>
        </div>
      </div>
    )}
  </div>
);

// Reusable Quantity Controls Component
const QuantityControls = ({ quantity, onDecrease, onIncrease, onRemove, disabled = false }) => (
  <div className="d-flex align-items-center">
    <div className="d-flex align-items-center border rounded">
      <button
        className="btn px-2 py-1"
        onClick={onDecrease}
        disabled={disabled}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button
        className="btn px-2 py-1"
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
    <button
      className="btn p-1 ms-2 text-danger"
      onClick={onRemove}
      disabled={disabled}
      aria-label="Remove item"
    >
      {disabled ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <MdDelete size={20} />
      )}
    </button>
  </div>
);


export default Cart;