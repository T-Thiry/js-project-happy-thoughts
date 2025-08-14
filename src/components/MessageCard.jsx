import React, {useState} from 'react';

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

const MessageCard = ({ message, onLike, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(message.message);

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveClick = () => {
    onEdit(message._id, updatedMessage); // Call the onEdit function
    setIsEditing(false); // Exit editing mode
  };

  const handleCancelClick = () => {
    setUpdatedMessage(message.message); // Reset the message
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="message-card">
       {isEditing ? (
        <div className='edit-container'>
          <textarea
            value={updatedMessage}
            onChange={(e) => setUpdatedMessage(e.target.value)}
            className="edit-textarea"
          />
           <div className="edit-buttons">
            <button onClick={handleSaveClick} className="button save-button">Save</button>
            <button onClick={handleCancelClick} className="button cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <p>{message.message}</p>
      )}
       <div className="top-right-actions">
       {!isEditing && (
          <button
            className="edit-button"
            onClick={handleEditClick} // Trigger the edit functionality
          >
            ✏️
          </button>
        )}
      <button
          className="delete-button"
          onClick={() => onDelete(message._id)} // Call the onDelete function
        >
          🗑️ 
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