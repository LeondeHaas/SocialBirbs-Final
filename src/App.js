import React, { useState, useEffect } from 'react';
import './Styles/App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';
import { auth } from './config/firebase';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [showToolTip, setShowToolTip] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToolTipClick = () => {
    setShowToolTip((prevShowToolTip) => !prevShowToolTip);
  };

  const appStyle = {
    height: authUser ? '100%' : '100vh',
    backgroundImage: `url(${authUser ? 'https://images.pexels.com/photos/795622/pexels-photo-795622.jpeg?auto=compress&cs=tinysrgb&w=1600' : '/images/pexels-sunny-2355546.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  };

  const wrapperStyle = {
    width: authUser ? '1300px' : '600px',
  };

  return (
    <div className="App" style={appStyle}>
      <div className="wrapper" style={wrapperStyle}>
        {authUser ? null : (
          <div className="account-wrapper">
            <h1>Welcome to SocialBirbs!</h1>
            <br />
            <SignIn />
            <br />
            <SignUp />
            <br />
            {!showToolTip ? (
              <button className="tool-tip" onClick={handleToolTipClick}>
                Tool Tip
              </button>
            ) : (
              <div className="tooltip">
                <p>Main account for testing purposes.</p>
                <p>leondehaas@gmail.com</p>
                <p>123456</p>
                <button className="close-tooltip" onClick={handleToolTipClick}>
                  Close Tool Tip
                </button>
              </div>
            )}
          </div>
        )}
        <AuthDetails />
      </div>
    </div>
  );
}

export default App;
