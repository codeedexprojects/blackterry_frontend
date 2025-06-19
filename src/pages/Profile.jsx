import React from "react";
import { IoMdPerson } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Footer from "/src/Components/Footer";

function Profile() {
  const navigate = useNavigate();
  const handleBacktoShop = () => {
    navigate("/shop");
  };

  const handleOrder = () => {
    navigate("/order");
  };
  return (
    <>
      <div className="container-fluid px-0">
        {/* Top Bar */}
        <div
          className="text-center py-1"
          style={{
            backgroundColor: "#D4CABC",
          }}
        >
          <h6
            className="m-0"
            style={{
              color: "#806248",
              fontSize: "0.9rem",
              fontWeight: "500",
              letterSpacing: "1px",
              padding: "5px",
            }}
          >
            BLACKTERRY
          </h6>
        </div>

        {/* Main Navigation Bar */}
        <div className="container-fluid px-3 py-3 border-bottom">
          <div
            className="header-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {/* Left Navigation */}
            <div className="d-flex gap-3 justify-content-start flex-wrap ms-5 me-5">
              <button
                onClick={handleBacktoShop}
                className="m-0  fw-light"
                style={{
                  border: "none",
                  textDecoration: "underline",
                  background: "transparent",
                }}
              >
                {" "}
                Back To Shop
              </button>
              <button
                onClick={handleOrder}
                className="m-0  fw-light"
                style={{
                  border: "none",
                  textDecoration: "underline",
                  background: "transparent",
                }}
              >
                Order
              </button>
            </div>

            {/* Center Logo */}
            <div className="text-center">
              <h3
                className="m-0 fw-bold text-uppercase"
                style={{
                  letterSpacing: "1px",
                  color: "#000",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                }}
              >
                BLACKTERRY
              </h3>
            </div>

            {/* Right Icons */}
            <div className="d-flex gap-3 justify-content-end fs-5">
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <IoMdPerson />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/">Logout</Dropdown.Item>
                  <Dropdown.Item href="/setting">Settings</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container py-5"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h1 className="text-dark fs-4 mb-4">Profile</h1>

            {/* Profile Details */}
            <div
              className=" text-dark rounded p-4 mb-4"
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <h4 className="fs-6 mb-2">Name</h4>
              <h4 className="fs-6 mb-2">Email</h4>
              <h4 className="fs-6 mb-2">bill.sanders@gmail.com</h4>
            </div>

            {/* Address Section */}
            <div
              className=" text-dark rounded p-4 mb-4"
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className=" fs-6 mb-0">Address</h4>
                <button className="btn btn-light btn-sm">+ Add</button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="No addresses added"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
