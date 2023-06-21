import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]); // New state to hold multiple posts

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new post document in the database
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
      });

      const newPostId = docRef.id;
      const newPost = { id: newPostId, title, description };
      setPosts((prevPosts) => [...prevPosts, newPost]); // Add new post to the array

      // Clear the form inputs after submitting
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handlePostSubmit}>
        <h2>Create a New Post</h2>
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
        <div>
          <h3>Posts:</h3>
          {posts.map((post) => (
            <div key={post.id}>
              <p>ID: {post.id}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
