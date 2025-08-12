import MessageCard from './MessageCard';

const MessageList = ({ messages, onLike }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} onLike={onLike} />
      ))}
    </div>
  );
};

export default MessageList;
