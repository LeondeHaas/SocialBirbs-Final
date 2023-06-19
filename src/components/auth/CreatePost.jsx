// CreatePost.jsx

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new post document in the database
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
      });

      console.log('Post created with ID: ', docRef.id);

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
    </div>
  );
};

export default CreatePost;
