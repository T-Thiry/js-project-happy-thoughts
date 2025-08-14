import MessageCard from './MessageCard';

const MessageList = ({ messages, onLike, onEdit, onDelete }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} onLike={onLike} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};

export default MessageList;
