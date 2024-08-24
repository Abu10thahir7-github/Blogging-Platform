import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './llog&reg.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        // Store the JWT token
        localStorage.setItem("current", res.data.userId);
console.log(res.data.userId);
        // Navigate to another page
        navigate("/");  // Redirect to a dashboard or home page after successful login
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setError("Invalid credentials");
        } else if (err.response && err.response.status === 404) {
          setError("User not found");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="log-sign">
      <div className="content-sign">
        <div className="sign-content">
          <h2 className="text-center">Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="email"
                required
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="password"
                required
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sign-btn">
              <button type="submit" className="btn btn-success w-100 rounded-2">
                Login
              </button>
            </div>
          </form>
          <Link to={"/register"}>
            <p>Don't have an account? Register</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
