import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth'; 

function Welcome() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigate('/'); 
      }
    });

    return () => {
      unsubscribe() ;
    };
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth) 
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Dev@Deakin</h1>
      <p>SIT313</p>
      {loggedIn ? (
        <button onClick={handleLogout}>Sign out</button>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Welcome;