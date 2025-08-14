import MessageCard from './MessageCard';

const MessageList = ({ messages, onLike, onDelete }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} onLike={onLike} onDelete={onDelete}/>
      ))}
    </div>
  );
};

export default MessageList;
