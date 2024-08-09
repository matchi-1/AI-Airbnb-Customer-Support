import React, { useState } from 'react';
import '../css/FeedbackContainer.css'; 

const FeedbackContainer = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    onClose(); 
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
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackContainer;
