import { useState, useEffect } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components//MessageList';
import SignupForm from './components/SignupForm';
import sharingImage from './assets/images/Sharing_thoughts.png';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://happy-thoughts-api-4ful.onrender.com/thoughts')
      .then(res => res.json())
      .then(data => {
        setMessages(data.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const addMessage = (newMessage) => {
    setMessages(prev => [newMessage, ...prev]);
  };

  const handleLike = (id) => {
    fetch(`https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(() => {
        setMessages(prev =>
          prev.map(msg => msg._id === id ? { ...msg, hearts: msg.hearts + 1 } : msg)
        );
      })
      .catch(err => console.error(err));
  };


  return (
    <>
    <SignupForm />
      <div className="header">
        <h1>Happy Thoughts</h1>
        <img src={sharingImage} alt="Sharing thoughts" />
      </div>
      <div className="outer-wrapper">
        <div className="app-container">
          <p>What makes you happy right now?</p>
          <MessageForm onAddMessage={addMessage} />
        </div>
        <div className="message-container">
          {loading ? <p>Loading thoughts...</p> : <MessageList messages={messages} onLike={handleLike} />}
        </div>
      </div>
    </>
  );
};


export default App;
