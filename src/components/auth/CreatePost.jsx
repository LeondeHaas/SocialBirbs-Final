import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const CreatePost = ({ authUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  const fetchPosts = async () => {
    try {
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

    await fetchPosts(); // Fetch the updated posts

  } catch (error) {
    console.error('Error adding post: ', error);
  }
};

  const removePost = async (postId) => {
    try {
      const post = posts.find((post) => post.id === postId);
      if (post && post.userId === authUser.uid) {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.log('You are not authorized to remove this post.');
      }
    } catch (error) {
      console.error('Error removing post: ', error);
    }
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
          className='desc'
          type="text"
          placeholder="Enter post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
              <p>Email: {post.email}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              {post.userId === authUser.uid && (
                <button className='remove-post' onClick={() => removePost(post.id)}>Remove post</button>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
