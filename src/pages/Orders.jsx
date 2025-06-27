import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronDown,
  FaEdit
} from "react-icons/fa";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import tshirt4 from "/src/assets/tshirt7.jpg";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { orderById } from "../services/allApi";

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderById(orderId);
        if (response && response.data) {
          setOrder(response.data.order);
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        setError(err.message || "Failed to load order details");
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading order details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <div className="alert alert-danger">{error}</div>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <p>Order not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <h4 className="mb-4">Order #{order.orderId}</h4>
        <Row className="g-3">
          {/* Product Card */}
          <Col md={6}>
            <Card className="p-3">
              <Row className="g-2 align-items-center">
                <Col xs={3}>
                  <img
                    src={order.products[0]?.productId?.images?.[0] || tshirt4}
                    alt={order.products[0]?.productId?.title}
                    className="img-fluid rounded"
                  />
                </Col>
                <Col xs={9}>
                  <div className="fw-medium">
                    {order.products[0]?.productId?.title}
                  </div>
                  <div className="text-muted small">
                    COLOR: {order.products[0]?.color}
                    {order.products[0]?.size && ` | SIZE: ${order.products[0].size}`}
                  </div>
                  <div className="fw-bold mt-2">
                    ₹{order.products[0]?.price}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Customer Card */}
          <Col md={6}>
            <Card className="p-3 d-flex justify-content-between flex-row align-items-center">
              <div>
                <div className="text-muted small">Customer</div>
                <div className="fw-medium d-flex align-items-center">
                  <FaUser className="me-2" /> 
                  {order.shippingAddress?.name}
                </div>
                <div className="text-muted small">
                  {order.products.length} Item{order.products.length > 1 ? 's' : ''}
                </div>
              </div>
              <FaChevronDown className="text-muted" />
            </Card>
          </Col>

          {/* Order Summary */}
          <Col md={6}>
            <Card className="p-3">
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹ {order.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping Charge</span>
                <span>₹ 0.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Taxes</span>
                <span>₹ 0.00</span>
              </div>
              {order.discountedAmount > 0 && (
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span>- ₹{order.discountedAmount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹ {order.finalPayableAmount?.toFixed(2)}</span>
              </div>
            </Card>
          </Col>

          {/* Customer Info */}
          <Col md={6}>
            <Card className="p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Customer Information</span>
                <FaEdit className="text-muted" />
              </div>
              <div className="mt-2 d-flex align-items-center">
                <FaEnvelope className="me-2 text-muted" />
                <span>{order.userId?.email || 'No email provided'}</span>
              </div>
              <div className="mt-2 d-flex align-items-center">
                <FaPhone className="me-2 text-muted" />
                <span>{order.shippingAddress?.phone}</span>
              </div>
            </Card>
          </Col>

          {/* Shipping Address */}
          <Col md={6}>
            <Card className="p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Shipping address</span>
                <FaEdit className="text-muted" />
              </div>
              <div className="mt-2 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1 text-muted" />
                <span>
                  {order.shippingAddress?.address},
                  <br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                  <br />
                  {order.shippingAddress?.country}
                </span>
              </div>
            </Card>
          </Col>

          {/* Order Meta */}
          <Col md={6}>
            <Card className="p-3">
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Order Date</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-muted small">Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-muted small">Payment Status</span>
                <span>{order.paymentStatus}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-muted small">Order Status</span>
                <span>{order.status}</span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;