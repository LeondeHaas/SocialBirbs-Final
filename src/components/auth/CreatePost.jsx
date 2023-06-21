import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const CreatePost = ({ authUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
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
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Upload progress
      },
      (error) => {
        console.error('Error uploading image: ', error);
      },
      async () => {
        // Upload completed successfully
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = await addDoc(collection(db, 'posts'), {
            title,
            description,
            image: downloadURL,
            userId: authUser.uid,
            email: authUser.email,
            timestamp: serverTimestamp()
          });

          const newPostId = docRef.id;
          const newPost = {
            id: newPostId,
            title,
            description,
            image: downloadURL,
            email: authUser.email,
            userId: authUser.uid
          };
          setPosts((prevPosts) => [...prevPosts, newPost]);

          setTitle('');
          setDescription('');
          setImage(null);
        } catch (error) {
          console.error('Error adding post: ', error);
        }
      }
    );
  } catch (error) {
    console.error('Error uploading image: ', error);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
          className="desc"
          type="text"
          placeholder="Enter post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button className="submit" type="submit">
          Submit post
        </button>
      </form>

      {posts.length > 0 && (
        <div className="posts-wrapper-wrapper">
          <h1>Posts:</h1>
          {posts.map((post) => (
            <div
              className={`posts-wrapper ${post.userId === authUser.uid ? 'user-post' : ''}`}
              key={post.id}
            >
              <img
                className="pfp"
                src="https://cdn-icons-png.flaticon.com/128/2571/2571562.png"
                alt=""
              />
              <p>Posted at: {post.timestamp && post.timestamp.toDate().toLocaleString()}</p>
              <p>Email: {post.email}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              {post.image && <img src={post.image} alt="Post Image" />} {/* Display the image if it exists */}
              {post.userId === authUser.uid && (
                <button className="remove-post" onClick={() => removePost(post.id)}>
                  Remove post
                </button>
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
