import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronDown,
  FaEdit,
} from "react-icons/fa";
import { Card, Col, Row } from "react-bootstrap";
import tshirt4 from "/src/assets/tshirt7.jpg";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function Orders() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h4 className="mb-4">Your order</h4>
        <Row className="g-3">
          {/* Product Card */}
          <Col md={6}>
            <Card className="p-3">
              <Row className="g-2 align-items-center">
                <Col xs={3}>
                  <img
                    src={tshirt4}
                    alt="shirt"
                    className="img-fluid rounded"
                  />
                </Col>
                <Col xs={9}>
                  <div className="fw-medium">Men's Retro Crew Neck T shirt</div>
                  <div className="text-muted small">COLOR: GREY</div>
                  <div className="fw-bold mt-2">₹999</div>
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
                  <FaUser className="me-2" /> Marvin McKinney
                </div>
                <div className="text-muted small">1 Order</div>
              </div>
              <FaChevronDown className="text-muted" />
            </Card>
          </Col>

          {/* Order Summary */}
          <Col md={6}>
            <Card className="p-3">
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹ 999.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping Charge</span>
                <span>₹ 000.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Taxes</span>
                <span>₹ 000.00</span>
              </div>
              <div className="d-flex justify-content-between ">
                <span>Discount</span>
                <span>- ₹1000.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹ 999.00</span>
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
                <span>debbie.baker@example.com</span>
              </div>
              <div className="mt-2 d-flex align-items-center">
                <FaPhone className="me-2 text-muted" />
                <span>(239) 555-0108</span>
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
                  2715 Ash Dr. San Jose,
                  <br />
                  South Dakota 83475
                </span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
