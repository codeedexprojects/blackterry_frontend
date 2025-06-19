import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginCode() {

    const navigate = useNavigate()
    
    const handleSubmit=()=>{
        navigate("/profile")
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
        <h5 className="text-startc text-dark mb-1">Enter code</h5>
        <p className="text-muted mb-3" style={{fontSize:"small"}}>
          Sent to fuivhfd@gmail.com
        </p>
        <input
          type="text"
          placeholder="6-digit code"
          className="form-control mb-3"
        />
        <button className="btn w-100 mb-3 " onClick={handleSubmit} style={{backgroundColor:'#50311D', color:"white"}}>Submit</button>
        <p className="text-muted" style={{ fontSize: "0.8rem" }}>
          Log with a different email
        </p>
        <p className="text-muted" style={{ fontSize: "0.8rem" }}>
          Privacy
        </p>
      </div>
    </div>
  </div>
  )
}

export default LoginCode
