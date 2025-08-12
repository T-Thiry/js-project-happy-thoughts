import React from "react";
import sharingImage from "../assets/images/Sharing_thoughts.png"
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";


const Home = ({ messages, loading, onLike, onAddMessage }) => {
  const token = localStorage.getItem('accessToken'); 
  const isDisabled = !token;

  // Corrected: Use localStorage.getItem instead of JSON.getItem
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return (
    <> 
      <div className="header">
        <h1>Happy Thoughts</h1>
        <img src={sharingImage} alt="Sharing thoughts" />
      </div>
      <div className="outer-wrapper">
        <div className="app-container">
          <p>What makes you happy right now?</p>
          <MessageForm 
          onAddMessage={onAddMessage} 
          disabled={isDisabled}
          user={user}/>
        </div>
        {isDisabled && (
          <p style={{ color: "red" }}>
          You need to be logged in to share your thoughts.
          </p>
        )}
        <div className="message-container">
          {loading ? 
          (<p>Loading thoughts...</p>     
          ) : (  
            <MessageList messages={messages} onLike={onLike} />
          )}
        </div>  
      </div>
    </>
  )
}

export default Home;