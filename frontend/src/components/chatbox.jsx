import React, { useState, useEffect, useRef } from "react";
import "../css/chatbox.css";
import FeedbackContainer from "../components/feedbackContainer.jsx";

export default function Chatbox() {
  const [chatHistory, setChatHistory] = useState([]);
  const [firstChat, setFirstChat] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const handleOpenFeedback = () => setIsFeedbackOpen(true);
  const handleCloseFeedback = () => setIsFeedbackOpen(false);
  const [feedbackIndex, setFeedbackIndex] = useState(null); // Track index of feedback

  const handleFeedback = (index, type) => {
    // Update feedback state based on user input
    setFeedback((prevFeedback) => {
      const newFeedback = [...prevFeedback];
      newFeedback[index] = type;
      return newFeedback;
    });
    setFeedbackIndex(index); // Update feedback index
  };

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
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", text: userInput },
    ]);

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

  useEffect(() => {
    // Scroll to the bottom of the chat history whenever it updates
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div id="chat-container">
      <div className="chat-header">
        <p>AI Assistant</p>
        <button>
          <i
            className="bi bi-x-lg"
            style={{ color: "#fff", fontSize: "20px" }}
          ></i>
        </button>
      </div>
      <div id="chat-main">
        <div id="chat-history">
          {firstChat ? (
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
            <div key={index}>
              <div className={msg.type === "user" ? "user-message" : "bot-message"}>
                <div>{msg.text}</div>
              </div>
              {msg.type === "bot" && (
                <div className="feedback-container">
                  <button
                    className={`thumbs-up ${feedback[index] === 'up' ? 'selected' : ''}`}
                    onClick={() => handleFeedback(index, 'up')}
                  >
                    <img src="/assets/images/thumbs-up.png" alt="Thumbs Up" className="feedback-icon"/>
                  </button>
                  <button
                    className={`thumbs-down ${feedback[index] === 'down' ? 'selected' : ''}`}
                    onClick={() => handleFeedback(index, 'down')}
                  >
                    <img src="/assets/images/thumbs-down.png" alt="Thumbs Down" className="feedback-icon"/>
                  </button>

                  {/* Conditionally render "Tell me more" button */}
                  {(feedback[index] === 'up' || feedback[index] === 'down') && (
                    <button className="txt-feedback-btn" onClick={handleOpenFeedback}>
                      Tell me more
                    </button>
                  )}

                  <FeedbackContainer
                    isOpen={isFeedbackOpen && feedbackIndex === index}
                    onClose={handleCloseFeedback}
                  />
                </div>
              )}
            </div>
          ))}


          <div ref={bottomRef}></div>
          {loading && (
            <div id="loader">
              <img src="/assets/gifs/loader1.gif" alt="Loading..." />
            </div>
          )}

        </div>
        <form onSubmit={sendMessage}>
          <div className={`input-bar ${inputActive ? "active" : ""}`}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}>
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
