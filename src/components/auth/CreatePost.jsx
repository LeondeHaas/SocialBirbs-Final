import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { auth } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        fetchPosts(user.uid); // Fetch posts for the current user
      } else {
        setAuthUser(null);
        setPosts([]); // Clear posts when the user logs out
      }
    });

    return () => {
      listen();
    };
  }, []);

  const fetchPosts = async (userId) => {
    try {
      // Fetch posts associated with the user from the database
      const q = query(collection(db, 'posts'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
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

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new post document in the database
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
        userId: authUser.uid, // Associate the post with the user ID
      });

      const newPostId = docRef.id;
      const newPost = { id: newPostId, title, description };
      setPosts((prevPosts) => [...prevPosts, newPost]);

      // Clear the form inputs after submitting
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handlePostSubmit}>
        <h1>Create a New Post</h1>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display the posts */}
      {posts.length > 0 && (
        <div className='posts-wrapper-wrapper'>
          <h1>Posts:</h1>
          {posts.map((post) => (
            <div className='posts-wrapper' key={post.id}>
              <p>ID: {post.id}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      {/* Show sign out button if user is authenticated */}
      {authUser && (
        <button className="sign-out" onClick={userSignOut}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default CreatePost;
