import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
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
        fetchPosts(user.uid);
      } else {
        setAuthUser(null);
        setPosts([]);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const fetchPosts = async (userId) => {
    try {
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
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
        userId: authUser.uid,
        email: authUser.email,
        timestamp: serverTimestamp()
      });

      const newPostId = docRef.id;
      const newPost = { id: newPostId, title, description, email: authUser.email };
      setPosts((prevPosts) => [...prevPosts, newPost]);

      setTitle('');
      setDescription('');

      window.location.reload();
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  const removePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error removing post: ', error);
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
        <input type="text" placeholder="Enter post title" value={title} onChange={(e) => setTitle(e.target.value)}
        />
        <input className='desc' type="text" placeholder="Enter post description" value={description} onChange={(e) =>
          setDescription(e.target.value)}
        />
        <button className='submit' type="submit">Submit post</button>
      </form>

      {posts.length > 0 && (
        <div className='posts-wrapper-wrapper'>
          <h1>Posts:</h1>
          {posts.map((post) => (
            <div className='posts-wrapper' key={post.id}>
              <img className='pfp' src="https://cdn-icons-png.flaticon.com/128/2571/2571562.png" alt="" />
              <p>Posted at: {post.timestamp && post.timestamp.toDate().toLocaleString()}</p>
              {/*<p>ID: {post.id}</p>*/}
              <p>Email: {authUser.email}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              <button className='remove-post' onClick={() => removePost(post.id)}>Remove post</button>
              <hr />
            </div>
          ))}
        </div>
      )}

      {/* {authUser && (
        <button className="sign-out" onClick={userSignOut}>
          Sign Out
        </button>
      )} */}
    </div>
  );
};

export default CreatePost;
