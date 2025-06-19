import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import image from "/src/assets/shirt1.jpg";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function Cart() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Men's Retro Crew Neck T shirt",
      price: 999,
      originalPrice: 1099,
      size: "S",
      color: "GREY",
      quantity: 1,
      image: image,
    },
    // Add more items as needed for testing
    // {
    //   id: 2,
    //   name: "Another Product",
    //   price: 1299,
    //   originalPrice: 1599,
    //   size: "M",
    //   color: "BLACK",
    //   quantity: 2,
    //   image: image,
    // }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <div className="container my-4 px-3 px-md-4">
          {cartItems.length === 0 ? (
            <EmptyCart handleLogin={handleLogin} />
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
                    <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                      <span>Estimated Total:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
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

// Reusable Empty Cart Component
const EmptyCart = ({ handleLogin }) => (
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
    <p className="text-muted small mb-2">HAVE AN ACCOUNT?</p>
    <p className="small">
      <span
        onClick={handleLogin}
        className="text-decoration-underline"
        style={{ color: "#50311D", cursor: "pointer" }}
      >
        LOGIN
      </span>
      <span className="text-muted"> TO CHECK OUT FASTER</span>
    </p>
  </div>
);

// Reusable Cart Item Component
const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="border-bottom pb-3 mb-3">
    <div className="row">
      {/* Product Image and Info */}
      <div className="col-12 col-md-6 mb-3 mb-md-0">
        <div className="d-flex gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="rounded"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <h6 className="fw-semibold mb-1">{item.name}</h6>
            <p className="mb-1 fw-bold">
              ₹{item.price} <del className="text-muted fw-normal ms-2">₹{item.originalPrice}</del>
            </p>
            <p className="mb-1 small">SIZE: {item.size}</p>
            <p className="mb-2 small">COLOR: {item.color}</p>
            <div className="d-md-none">
              <QuantityControls 
                quantity={item.quantity}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onRemove={() => removeItem(item.id)}
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
  </div>
);

// Reusable Quantity Controls Component
const QuantityControls = ({ quantity, onDecrease, onIncrease, onRemove }) => (
  <div className="d-flex align-items-center">
    <div className="d-flex align-items-center border rounded">
      <button 
        className="btn px-2 py-1"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button 
        className="btn px-2 py-1"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
    <button 
      className="btn p-1 ms-2 text-danger"
      onClick={onRemove}
      aria-label="Remove item"
    >
      <MdDelete size={20} />
    </button>
  </div>
);

export default Cart;