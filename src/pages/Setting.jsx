import React from "react";
import { IoMdPerson } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Footer from "/src/Components/Footer";

function Setting() {
  return (
    <>
      <div className="container-fluid px-0">
        {/* Top Bar */}
        <div
          className="text-center py-1"
          style={{ backgroundColor: "#D4CABC", marginTop: "20px" }}
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
                className="m-0 fw-light"
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
                className="m-0 fw-light"
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
            <div className="d-flex gap-3 justify-content-end fs-5 me-4">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{ border: "none", background: "transparent" }}
                >
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

      {/* Profile Section */}
      <div
        className="container py-5"
        style={{ marginBottom: "100px", marginTop: "100px" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            {/* Heading (LEFT aligned) */}
            <h1 className="text-dark fs-4 mb-5">Profile</h1>

            {/* Flex box for Cards */}
            <div className="d-flex justify-content-center align-items-start flex-wrap gap-4">
              {/* Log out everywhere */}
              <div
                className="text-dark rounded p-4"
                style={{
                  minWidth: "300px",
                  maxWidth: "400px",
                  flex: "1 1 300px",
                }}
              >
                <h2
                  className=" mb-2"
                  style={{ fontSize: "19px", fontWeight: "bold" }}
                >
                  Log out everywhere
                </h2>
                <p className="fs-6 mb-0">
                  If you've lost a device or have security concerns, log out
                  everywhere to ensure the security of your account
                </p>
              </div>

              {/* Address */}
              <div
                className="text-dark rounded p-4"
                style={{
                  backgroundColor: "#EEEEEE",
                  minWidth: "300px",
                  maxWidth: "400px",
                  flex: "1 1 300px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4
                    className=" mb-0 rounded p-2 "
                    style={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      fontSize: "13px",
                    }}
                  >
                    Logout Everywhere
                  </h4>
                  <h4 className="btn  text-sm">
                    You will be logged out on this device as well.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Setting;
