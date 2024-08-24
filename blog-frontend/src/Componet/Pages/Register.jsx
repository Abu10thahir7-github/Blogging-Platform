import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './llog&reg.css';

function Signup() {
  const [username, setUsername] = useState(""); // Add username state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/auth/register", {
        username,  // Include username in the request body
        name,
        email,
        password,
        phone,
      })
      .then((res) => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 409) {
          setError("Email already exists");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="log-sign">
      <div className="content-sign">
        <div className="sign-content">
          <h2 className="text-center">Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="username"
                required
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="name"
                required
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="number"
                required
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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
                Register
              </button>
            </div>
          </form>
          <Link to={"/login"}>
            <p>Already have an account?</p>
          </Link>
          <Link to={"/login"} className="">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
