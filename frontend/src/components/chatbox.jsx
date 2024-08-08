import React, { useState, useEffect, useRef } from "react";
import "../css/chatbox.css";

export default function Chatbox() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (loading) return;
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
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
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

  useEffect(() => {
    // Scroll to the bottom of the chat history whenever it updates
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div id="chat-container">
      <div className="chat-header">
        <h4>AI Assistant</h4>
        <button>
          <img src="/assets/images/close.png" alt="Close Button" />
        </button>
      </div>
      <div id="chat-main">
        <div id="chat-history">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "user" ? "user-message" : "bot-message"}
            >
              <div>{msg.text}</div>
            </div>
          ))}
          {/* Reference to the bottom of the chat */}
          <div ref={bottomRef}></div>
          {loading && (
            <div id="loader">
              <img src="/assets/gifs/loader.gif" alt="Loading..." />
            </div>
          )}
        </div>
        <form onSubmit={sendMessage}>
          <div className="input-bar">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your message"
              disabled={loading}
            />
            <button className="send-btn" type="submit">
              <img src="/assets/images/send.png" alt="Send Message" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
