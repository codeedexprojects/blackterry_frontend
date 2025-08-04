import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronDown,
  FaEdit
} from "react-icons/fa";
import { Card, Col, Row, Spinner, Button, Modal, Form, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import tshirt4 from "/src/assets/tshirt7.jpg";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { orderById, cancelOrder, returnOrder } from "../services/allApi";

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Predefined reasons
  const cancelReasons = [
    "Changed my mind",
    "Found a better price elsewhere",
    "Ordered by mistake",
    "No longer needed",
    "Delivery taking too long",
    "Other"
  ];

  const returnReasons = [
    "Product defective/damaged",
    "Wrong item received",
    "Size doesn't fit",
    "Color different from expected",
    "Quality not as expected",
    "Product not as described",
    "Other"
  ];

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

  const handleCancelOrder = () => {
    setShowCancelModal(true);
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleReturnOrder = () => {
    setShowReturnModal(true);
    setSubmitError("");
    setSubmitSuccess("");
  };

  const submitCancelRequest = async () => {
    if (!cancelReason.trim()) {
      setSubmitError("Please provide a reason for cancellation");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await cancelOrder(orderId, { reason: cancelReason });
      if (response) {
        setSubmitSuccess("Cancel request submitted successfully! Admin will review your request.");
        setTimeout(() => {
          setShowCancelModal(false);
          setCancelReason("");
          setSubmitSuccess("");
        }, 2000);
      }
    } catch (error) {
      setSubmitError("Failed to submit cancel request. Please try again.");
      console.error("Error canceling order:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const submitReturnRequest = async () => {
    if (!returnReason.trim()) {
      setSubmitError("Please provide a reason for return");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await returnOrder(orderId, { reason: returnReason });
      if (response) {
        setSubmitSuccess("Return request submitted successfully! Admin will review your request.");
        setTimeout(() => {
          setShowReturnModal(false);
          setReturnReason("");
          setSubmitSuccess("");
        }, 2000);
      }
    } catch (error) {
      setSubmitError("Failed to submit return request. Please try again.");
      console.error("Error returning order:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const isWithinReturnPeriod = () => {
    if (!order?.createdAt) return false;
    const orderDate = new Date(order.createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
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

  const showCancelButton = ["pending", "processing"].includes(order.status.toLowerCase());
  const showReturnButton = order.status.toLowerCase() === "delivered" && isWithinReturnPeriod();

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
                    src={
                      order.products[0]?.productId?.images?.length > 0
                        ? `https://blackterry.in/uploads/${order.products[0].productId.images[0]}`
                        : tshirt4
                    }
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

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-4">
          {showCancelButton && (
            <Button
              variant="outline-danger"
              className="me-2"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          )}
          {showReturnButton && (
            <Button
              variant="outline-primary"
              onClick={handleReturnOrder}
            >
              Return Order
            </Button>
          )}
        </div>
      </div>

      {/* Cancel Order Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Reason for cancellation *</Form.Label>
              <Form.Select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                disabled={submitting}
              >
                <option value="">Select a reason</option>
                {cancelReasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {cancelReason === "Other" && (
              <Form.Group className="mb-3">
                <Form.Label>Please specify</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Please provide details..."
                  value={cancelReason === "Other" ? "" : cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  disabled={submitting}
                />
              </Form.Group>
            )}
          </Form>

          <div className="text-muted small">
            <strong>Note:</strong> Your cancellation request will be reviewed by our admin team.
            You'll be notified once the request is approved or declined.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCancelModal(false)}
            disabled={submitting}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={submitCancelRequest}
            disabled={submitting || !cancelReason.trim()}
          >
            {submitting ? (
              <>
                <Spinner size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              'Submit Cancel Request'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Return Order Modal */}
      <Modal show={showReturnModal} onHide={() => setShowReturnModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Return Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Reason for return *</Form.Label>
              <Form.Select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                disabled={submitting}
              >
                <option value="">Select a reason</option>
                {returnReasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {returnReason === "Other" && (
              <Form.Group className="mb-3">
                <Form.Label>Please specify</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Please provide details..."
                  value={returnReason === "Other" ? "" : returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  disabled={submitting}
                />
              </Form.Group>
            )}
          </Form>

          <div className="text-muted small">
            <strong>Note:</strong> Your return request will be reviewed by our admin team.
            You'll be notified once the request is approved. Returns are accepted within 7 days of delivery.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowReturnModal(false)}
            disabled={submitting}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={submitReturnRequest}
            disabled={submitting || !returnReason.trim()}
          >
            {submitting ? (
              <>
                <Spinner size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              'Submit Return Request'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}

export default OrderDetails;