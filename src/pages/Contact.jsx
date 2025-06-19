import React from "react";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function Contact() {
  return (
    <div>
      <Header />

      <div className="container mt-5">
        {/* Contact Heading */}
        <h3
          style={{
            color: "#50311D",
            textAlign: "left",
            marginLeft: "340px",
            marginBottom: "1rem",
          }}
        >
          Contact
        </h3>

        {/* Centered Form Section */}
        <div
          className="mx-auto d-flex flex-column align-items-center"
          style={{ maxWidth: "850px" }}
        >
          <div className="d-flex flex-wrap gap-3 mb-3 justify-content-center w-100">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              style={{
                padding: "15px",
                maxWidth: "300px",
                minWidth: "150px",
                border: "1px solid #50311D",
              }}
            />
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              style={{
                padding: "15px",
                maxWidth: "300px",
                minWidth: "150px",
                border: "1px solid #50311D",
              }}
            />
          </div>

          <div className="mb-3 w-100 d-flex justify-content-center">
            <input
              type="text"
              placeholder="Phone"
              className="form-control"
              style={{
                padding: "15px",
                maxWidth: "620px",
                border: "1px solid #50311D",
              }}
            />
          </div>

          <div className="mb-3 w-100 d-flex justify-content-center">
            <input
              type="Message"
              placeholder="Message"
              className="form-control"
              style={{
                padding: "30px",
                maxWidth: "620px",
                border: "1px solid #50311D",
              }}
            />
          </div>
        </div>

        {/* Send Button - Left Aligned */}
        <div>
          <button
            style={{
              backgroundColor: "#50311D",
              color: "white",
              padding: "8px 20px",
              border: "1px solid #50311D",
              borderRadius: "10px",
              marginLeft: "340px",
              width: "150px",
            }}
          >
            Send
          </button>
        </div>
      </div>

      <h1
        className="name ms-5 mt-5 text-center"
        style={{ color: "#50311D", fontSize: "160px", fontWeight: "bold" }}
      >
        BLACKTERRY
      </h1>
      <Footer />
    </div>
  );
}

export default Contact;
