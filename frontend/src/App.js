import React from "react";
import Chatbox from "./components/chatbox.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup";
import Login from "./components/login.jsx";
import Header from "./components/header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/chat" element={<Chatbox />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
