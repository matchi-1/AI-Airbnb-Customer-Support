import React, { useState } from "react";
import "../css/chatbox.css";

export default function Chatbox() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setChatHistory([
        ...chatHistory,
        { type: "user", text: userInput },
        { type: "bot", text: data.response },
      ]);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="chat-container">
      <h4>AI Assistant</h4>
      <div id="chat-history">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={msg.type === "user" ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your message"
        />
        <button className="pink-btn" type="submit">
          Send
        </button>
      </form>
      {loading && (
        <div id="loader">
          <img src="loader.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
}
