import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {

const navigate = useNavigate()
    const handleContinue=()=>{
       navigate('/loginc')
    }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="bg-white p-4 p-md-5 rounded shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="mb-4 text-start text-center" style={{ fontWeight: "bold", color:""}}>
          BLACKTERRY
        </h1>
        <div>
          <h5 className="text-startc text-dark mb-1">Login</h5>
          <p className="text-muted mb-3" style={{fontSize:"small"}}>
            Enter your email and we'll send you a login code
          </p>
          <input
            type="text"
            placeholder="Email"
            className="form-control mb-3"
          />
          <button className="btn w-100 mb-3 " onClick={handleContinue} style={{backgroundColor:'#50311D', color:"white"}}>Continue</button>
          <p className="text-muted" style={{ fontSize: "0.8rem" }}>
            Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
