import React from 'react';

function timeAgo(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now - then;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

const MessageCard = ({ message, onLike, onDelete }) => {
  return (
    <div className="message-card">
      <div className='delete-message'>
      <p>{message.message}</p>
      <button
          className="delete-button"
          onClick={() => onDelete(message._id)} // Call the onDelete function
        >
          🗑️ Delete
        </button>
        </div>
      <div className="message-actions">
        <button className={`like-button ${message.hearts > 0 ? 'liked' : ''}`}onClick={() => onLike(message._id)}>❤️</button>
        <span className="like-count">x {message.hearts}</span>
        <small className="time-ago">{timeAgo(message.createdAt)}</small>
      </div>
    </div>
  );
};

export default MessageCard;