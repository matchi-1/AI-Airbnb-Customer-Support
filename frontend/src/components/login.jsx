import React, { useState, useContext } from "react";
import "../css/login.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Authcontext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="content-container">
      <div className="content-header">
        <h2>LOGIN</h2>
      </div>
      <div className="content-main">
        <form onSubmit={handleLogin} className="content-form">
          <div className="form-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-submit">
            Login
          </button>
          <div className="form-redirect">
            <p>
              <Link to="/signup">Don't have an account yet?</Link>
            </p>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
