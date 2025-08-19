import React from "react";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { Mail, Phone, MapPin } from "lucide-react"; // Optional: for icons

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
            <div className="text-start mb-5">
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

            {/* Contact Details */}
            <div className="mt-4 p-4 border rounded" style={{ borderColor: "#50311D" }}>
              <h5 style={{ color: "#50311D", fontWeight: "600", marginBottom: "15px" }}>
                Contact Information
              </h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <Phone className="text-success" size={18} />
                <a href="tel:+919847072542" className="text-dark text-decoration-none">
                  +91 77366 95788
                </a>
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <Mail className="text-success" size={18} />
                <a href="mailto:blackterrytees@gmail.com" className="text-dark text-decoration-none">
                  blackterrytees@gmail.com
                </a>
              </div>
              <div className="d-flex align-items-start gap-2">
                <MapPin className="text-success" size={18} />
                <span>
                  Blackterry Tees<br />
                  Pappayi, Chappangadi - PO<br />
                  Kottakkal, Malappuram<br />
                  Kerala – 676503
                </span>
              </div>
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
