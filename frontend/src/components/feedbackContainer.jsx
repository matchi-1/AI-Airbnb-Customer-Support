import React, { useState } from "react";
import "../css/FeedbackContainer.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const FeedbackContainer = ({ isOpen, onClose, messageId, goodFeedback }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!messageId) {
      console.error("Message ID is not provided");
      return;
    }

    try {
      const feedbackData = {
        messageId,
        goodFeedback,
        feedbackText: feedback,
        timestamp: new Date(),
      };

      const docRef = doc(db, "Feedbacks", messageId);
      await setDoc(docRef, feedbackData, { merge: true });

      console.log("Feedback submitted successfully");
      setFeedback("");
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-popup">
      <div className="feedback-popup-content">
        <button className="feedback-popup-close" onClick={onClose}>
          &times;
        </button>
        <p>What did you think of the assistant's response?</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Write your feedback here..."
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackContainer;
