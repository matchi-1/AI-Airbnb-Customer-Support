import React, {useState} from "react";
import "../css/login.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return ( 
    <div id = "container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div>
          <p><a href = "/SignUp.js">Don't have an account?</a></p>
        </div>
      </form>
      {error && <p>{error}</p>}
  </div>
  );
}
