import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../services/allApi";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await userRegister(formData);
      if (response.message === "OTP sent successfully") {
        navigate("/loginc", { state: { phone: formData.phone, isRegister: true } });
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="bg-white p-4 p-md-5 rounded shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="mb-4 text-center" style={{ fontWeight: "bold" }}>
          BLACKTERRY
        </h1>
        <div>
          <h5 className="text-dark mb-1">Register</h5>
          <p className="text-muted mb-3" style={{ fontSize: "small" }}>
            Create your account to continue
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-3"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button
            className="btn w-100 mb-3"
            onClick={handleRegister}
            disabled={loading}
            style={{ backgroundColor: "#50311D", color: "white" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
            By registering, you agree to our Privacy Policy.
          </p>

          <p className="text-center" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#50311D", fontWeight: "500" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;