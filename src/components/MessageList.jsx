import MessageCard from './MessageCard';

const MessageList = ({ messages, onLike, onEdit, onDelete, disabled }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} onLike={onLike} onEdit={onEdit} onDelete={onDelete} disabled={disabled}/>
      ))}
    </div>
  );
};

export default MessageList;
