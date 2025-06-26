import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { userOTPVerify } from '../services/allApi';

function LoginCode() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        if (location.state) {
            setPhone(location.state.phone || "");
            setIsRegister(location.state.isRegister || false);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await userOTPVerify({
                phone,
                otp
            });
            
            if (response.message === "User verified successfully") {
                
                localStorage.setItem("userToken", response.token );
                localStorage.setItem("userId", response.user.userId);
                navigate("/profile");
            } else {
                setError(response.message || "OTP verification failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during verification");
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
                <h1 className="mb-4 text-start text-center" style={{ fontWeight: "bold" }}>
                    BLACKTERRY
                </h1>
                <div>
                    <h5 className="text-startc text-dark mb-1">Enter code</h5>
                    <p className="text-muted mb-3" style={{fontSize:"small"}}>
                        Sent to +{phone}
                    </p>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <input
                        type="text"
                        placeholder="6-digit code"
                        className="form-control mb-3"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button 
                        className="btn w-100 mb-3" 
                        onClick={handleSubmit} 
                        disabled={loading}
                        style={{backgroundColor:'#50311D', color:"white"}}
                    >
                        {loading ? "Verifying..." : "Submit"}
                    </button>
                    <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                        Login with a different email
                    </p>
                    <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                        Privacy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginCode;