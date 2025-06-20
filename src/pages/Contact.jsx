import React from "react";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function Contact() {
  return (
    <div>
      <Header />

      <div className="container mt-5 px-3">
        {/* Contact Heading */}
        <h3
          className="mb-4"
          style={{
            color: "#50311D",
            textAlign: "left",
          }}
        >
          Contact
        </h3>

        {/* Form Section */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  style={{
                    padding: "15px",
                    border: "1px solid #50311D",
                  }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  style={{
                    padding: "15px",
                    border: "1px solid #50311D",
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Phone"
                className="form-control"
                style={{
                  padding: "15px",
                  border: "1px solid #50311D",
                }}
              />
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Message"
                className="form-control"
                rows={4}
                style={{
                  padding: "15px",
                  border: "1px solid #50311D",
                }}
              ></textarea>
            </div>

            {/* Send Button */}
            <div className="text-start">
              <button
                style={{
                  backgroundColor: "#50311D",
                  color: "white",
                  padding: "10px 25px",
                  border: "1px solid #50311D",
                  borderRadius: "10px",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Name */}
      <h1
        className="text-center mt-5"
        style={{
          color: "#50311D",
          fontSize: "10vw",
          fontWeight: "bold",
          wordBreak: "break-word",
        }}
      >
        BLACKTERRY
      </h1>

      <Footer />
    </div>
  );
}

export default Contact;
