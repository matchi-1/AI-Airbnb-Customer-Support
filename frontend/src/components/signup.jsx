import React, { useState } from "react";
import "../css/signup.css";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName]= useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      });

      navigate('/chat');

    } catch (err) {
      setError(err.message);
    }
  };

  return ( 
    <div id = "container">
      <h2>Create an Account</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <div>
          <p><a href = "/SignUp.js">Already have an account?</a></p>
        </div>
      </form>
      {error && <p>{error}</p>}
  </div>
  );
}
