import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import tshirt4 from "/src/assets/tshirt7.jpg";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { allOrders } from "../services/allApi";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await allOrders(userId);
        if (response && response.data) {
          setOrders(response.data.orders || []);
        } else {
          throw new Error("No orders found");
        }
      } catch (err) {
        setError(err.message || "Failed to load orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateExpectedDelivery = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7); // Adding 7 days as expected delivery
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
          <p className="mt-3">Loading your orders...</p>
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

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <h4 className="mb-4">Your Orders</h4>
          <p className="text-center">You haven't placed any orders yet.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <h4 className="mb-4">Your Orders</h4>
        
        {orders.map((order) => (
          <Card key={order._id} className="mb-3">
            <Card.Body>
              <Row className="align-items-center">
                {/* Product Image - Show first product image */}
                <Col xs={3} md={2}>
                  <img
                    src={order.products[0]?.productId?.images?.[0] || tshirt4}
                    alt={order.products[0]?.productId?.title || "Product"}
                    className="img-fluid rounded"
                  />
                </Col>
                
                {/* Product Info */}
                <Col xs={5} md={6}>
                  <div className="fw-medium">
                    {order.products[0]?.productId?.title || "Product"}
                    {order.products.length > 1 && ` + ${order.products.length - 1} more`}
                  </div>
                  <div className="text-muted small">
                    {order.products[0]?.color && `Color: ${order.products[0].color}`}
                    {order.products[0]?.size && ` | Size: ${order.products[0].size}`}
                    {order.products[0]?.quantity && ` | Qty: ${order.products[0].quantity}`}
                  </div>
                  <div className="mt-2">
                    <Badge 
                      bg={getStatusBadgeClass(order.status)} 
                      className="text-capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </Col>
                
                {/* Dates */}
                <Col xs={4} md={3} className="text-end">
                  <div className="small text-muted">Ordered: {formatDate(order.createdAt)}</div>
                  <div className="small text-muted">Expected: {calculateExpectedDelivery(order.createdAt)}</div>
                </Col>
                
                {/* View Details */}
                <Col xs={12} md={1} className="text-end mt-2 mt-md-0">
                  <button 
                    className="btn btn-link p-0 text-dark"
                    onClick={() => {
                      // Navigate to order details page with order._id
                      window.location.href = `/orders/${order._id}`;
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default OrderList;