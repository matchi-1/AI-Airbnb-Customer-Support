import React, { useState } from 'react';
import './App.css'; 

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const formatBotMessage = (message) => {
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    message = message.replace(/\n/g, '<br>');
    message = message.replace(/(\d+)\.\s+/g, '<li>');
    message = message.replace(/<\/li><br>/g, '</li>');  

    if (message.includes('<li>')) {
        message = '<ol>' + message + '</ol>';
    }
    message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

    return message;
};


  const sendMessage = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      
      // Format the bot response before setting it to chat history
      const formattedBotResponse = formatBotMessage(data.response);

      setChatHistory([...chatHistory, { type: 'user', text: userInput }, { type: 'bot', text: formattedBotResponse }]);
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
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
            className={msg.type === 'user' ? 'user-message' : 'bot-message'} 
            dangerouslySetInnerHTML={{ __html: msg.text }} // Use dangerouslySetInnerHTML to render formatted HTML
          />
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
      {loading && <div id="loader"><img src="loader.gif" alt="Loading..." /></div>}
    </div>
  );
}

export default Chat;
