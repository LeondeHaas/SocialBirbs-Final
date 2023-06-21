import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, getDocs } from 'firebase/firestore'; // Add the necessary imports
import { db } from '../../config/firebase';
import CreatePost from './CreatePost';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [hideUserPosts, setHideUserPosts] = useState(false); // State to hide user's posts

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        fetchPosts(); // Fetch posts when the authUser state changes
      } else {
        setAuthUser(null);
        setPosts([]);
        setFilteredPosts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      // Fetch all posts from the database
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        const postData = { id: doc.id, ...doc.data() };
        fetchedPosts.push(postData);
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts([]);
      return;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseSearchTerm) ||
        post.description.toLowerCase().includes(lowercaseSearchTerm)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const toggleHideUserPosts = () => {
    setHideUserPosts(!hideUserPosts);
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='test'>
      {authUser ? (
        <>
          <p>{`You are signed in as ${authUser.email}`}</p>
          <button className="hide-posts" onClick={toggleHideUserPosts}>
            {hideUserPosts ? 'Show My Posts' : 'Hide My Posts'}
          </button>
          <button className="sign-out" onClick={userSignOut}>
            Sign Out
          </button>
          <br />
          <input
            className='search'
            type="text"
            placeholder="Search posts"
            value={searchTerm}
            onChange={handleSearch}
          />
          <br />
          <br />
          {filteredPosts.length > 0 ? (
            <>
              <h1>Filtered Posts:</h1>
              {filteredPosts.map((post) => (
                <div key={post.id}>
                  <p>Title: {post.title}</p>
                  <p>Description: {post.description}</p>
                </div>
              ))}
            </>
          ) : (
            <CreatePost authUser={authUser} hideUserPosts={hideUserPosts} /> // Pass hideUserPosts prop
          )}
        </>
      ) : (
        <p>You are currently signed out.</p>
      )}
    </div>
  );
};

export default AuthDetails;
