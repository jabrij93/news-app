import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-overlay">
        <h1 className="login-title">find.My.News :)</h1>

        <div className="login-card">
          <form>
            <div className="form-group">
              <label htmlFor="username">User Name*</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
