import React, {useState, useContext} from "react";
import "../css/login.css";
import { useNavigate, Link} from "react-router-dom";
import { AuthContext } from "../Authcontext";

export default function Login() {
  const {login}  = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/chat');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return ( 
    <div id = "chat-container">
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
          <p><Link to="/signup">Don't have an account?</Link></p>
        </div>
      </form>
      {error && <p>{error}</p>}
  </div>
  );
}
