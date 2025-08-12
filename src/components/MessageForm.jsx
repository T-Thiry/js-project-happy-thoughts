import { useState } from 'react';

const MessageForm = ({ onAddMessage, disabled, user }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) {
      setError('You must login to send a message.');
      return;
    }

    if (message.trim().length < 5 || message.trim().length > 140) {
      setError('Message must be between 5 and 140 characters');
      return;
    }

    const token = localStorage.getItem('accessToken');

    fetch('https://happy-thoughts-api-svd7.onrender.com/thoughts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
       },
      body: JSON.stringify({ message: message.trim() })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          onAddMessage(data.response);
          setMessage('');
          setError('');
        } else {
          setError('Something went wrong.');
        }
      })
      .catch(() => setError('Network error'));
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        value={message}
        onChange={(e) => { 
          if (e.target.value.length <= 140) {
            setMessage(e.target.value);
          }
        }}
        placeholder={disabled ? "Log in to write a thought" : "Write a happy thought..."}
        rows="3"
        disabled={disabled}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={disabled || !message.trim()}>Send Message ❤️</button>
    </form>
  );
};

export default MessageForm;