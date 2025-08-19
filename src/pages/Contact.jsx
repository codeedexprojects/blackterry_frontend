import React, { useState } from "react";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const whatsappNumber = "917736695788"; // WhatsApp number without + or spaces
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

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
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "15px",
                      border: "1px solid #50311D",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "15px",
                      border: "1px solid #50311D",
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "15px",
                    border: "1px solid #50311D",
                  }}
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  placeholder="Message"
                  className="form-control"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "15px",
                    border: "1px solid #50311D",
                  }}
                ></textarea>
              </div>

              {/* Send Button */}
              <div className="text-start mb-5">
                <button
                  type="submit"
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
            </form>

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