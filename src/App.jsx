import { useState, useEffect } from 'react';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('home');
  const token = localStorage.getItem('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);


  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://happy-thoughts-api-svd7.onrender.com/thoughts')
    // ')
      .then(res => res.json())
      .then(data => {
        setMessages(data.response.slice(0, 5));
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
    const token = localStorage.getItem('accessToken');
    
   
    fetch(`https://happy-thoughts-api-svd7.onrender.com/thoughts/${id}/like`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        setMessages(prev =>
          prev.map(msg => msg._id === id ? { ...msg, hearts: msg.hearts + 1 } : msg)
        );
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setPage('login');
  }

  const handleLoginSuccess = () => {
  setIsLoggedIn(true);
  setPage('home');
  fetchThoughts();
  }

  return (
    <>
      <nav>
        <button onClick={() => setPage('home')} disabled={!isLoggedIn}>Home</button>
        {!isLoggedIn && <button onClick={() => setPage('signup')}>Sign Up</button>}
        {!isLoggedIn && <button onClick={() => setPage('login')}>Login</button>}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>

      {page === 'signup' && <Signup onSuccess={handleLoginSuccess} />}
      {page === 'login' && <Login onSuccess={handleLoginSuccess} />}
      {page === 'home' && (
          <Home
          messages={messages}
          loading={loading}
          onLike={handleLike}
          onAddMessage={addMessage}
          />
      )}
    </>
  );
};

export default App;
