import React, { useState } from "react";
import "../css/signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function comparePasswords(pwd) {
    if (pwd !== password) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      });

      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="content-container" className="signup-container">
      <div className="content-header">
        <h2>create an account</h2>
      </div>
      <div className="content-main">
        <form onSubmit={handleLogin} className="content-form">
          <div className="form-group">
            <div className="form-input">
              <label>First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-input">
              <label>Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="form-input">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-input">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                  comparePasswords(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
          <div className="form-redirect">
            <p>
              <Link to="/">Already have an account?</Link>
            </p>
          </div>
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
