import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../services/allApi";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await userLogin({ phone });
      if (response.message ) {

        if (response.message === "OTP sent successfully") {
          console.log("Navigating to loginc with phone:", phone);
          navigate("/loginc", { state: { phone, isRegister: false } });
        }
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
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
          <h5 className="text-dark mb-1">Login</h5>
          <p className="text-muted mb-3" style={{ fontSize: "small" }}>
            Enter your mobile number and we'll send you a login code
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="tel"
            placeholder="Mobile Number"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            className="btn w-100 mb-3"
            onClick={handleContinue}
            disabled={loading}
            style={{ backgroundColor: "#50311D", color: "white" }}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>

          <p className="text-muted" style={{ fontSize: "0.8rem" }}>
            Privacy
          </p>

          <p className="text-center" style={{ fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#50311D", fontWeight: "500" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;