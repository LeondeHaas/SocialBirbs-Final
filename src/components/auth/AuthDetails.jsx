// AuthDetails.jsx

import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import CreatePost from './CreatePost';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out successfully');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`You are signed in as ${authUser.email}`}</p>
          <br />
          <CreatePost />
          <br />
          <button className="sign-out" onClick={userSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <p>You are currently signed out.</p>
      )}
    </div>
  );
};

export default AuthDetails;
