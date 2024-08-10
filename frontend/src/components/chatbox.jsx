import React, { useState, useEffect, useRef } from "react";
import "../css/chatbox.css";

export default function Chatbox() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isFirstChat, setFirstChat] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({}); // State to manage feedback
  const bottomRef = useRef(null);
  const prompts = [
    "I need help with booking a place.",
    "How do I modify or cancel my reservation?",
    "Can you help me with a billing issue?",
    "How can I contact the host of my reservation?",
  ];

  const sendMessage = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setFirstChat(false);
    setUserInput("");
    const input = userInput;
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", text: input },
    ]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "bot", text: data.response },
      ]);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendPrompt = async (prompt) => {
    if (loading) return;
    setLoading(true);
    setFirstChat(false);
    setUserInput("");

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", text: prompt },
    ]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: prompt }),
      });

      const data = await response.json();
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "bot", text: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (index, type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [index]: prevFeedback[index] === type ? null : type,
    }));
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
          <i
            className="bi bi-x-lg"
            style={{ color: "#fff", fontSize: "20px" }}
          ></i>
        </button>
      </div>
      <div id="chat-main">
        <div id="chat-history">
          {isFirstChat ? (
            <div id="prompt-container">
              {prompts.map((prompt, index) => (
                <button
                  onClick={() => {
                    sendPrompt(prompt);
                  }}
                  key={index}
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "user" ? "user-message" : "bot-message"}
            >
              <div className="message">{msg.text}</div>
            </div>
          ))}

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
              required
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
