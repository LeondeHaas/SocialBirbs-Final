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
  const [imageUrl, setImageUrl] = useState('');
  const [posts, setPosts] = useState([]);
  const [hidePosts, setHidePosts] = useState(false);

  useEffect(() => {
    fetchPosts();
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
      let downloadURL = imageUrl || null;

      if (image) {
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
            try {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              savePost(downloadURL);
            } catch (error) {
              console.error('Error adding post: ', error);
            }
          }
        );
      } else {
        savePost(downloadURL);
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const savePost = async (imageURL) => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
        image: imageURL,
        userId: authUser.uid,
        email: authUser.email,
        timestamp: serverTimestamp()
      });

      const newPostId = docRef.id;
      const newPost = {
        id: newPostId,
        title,
        description,
        image: imageURL,
        email: authUser.email,
        userId: authUser.uid
      };

      setPosts((prevPosts) => [...prevPosts, newPost]);
      setTitle('');
      setDescription('');
      setImage(null);
      setImageUrl('');

      window.location.reload();
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl('');
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImage(null);
  };

  const togglePostVisibility = () => {
    setHidePosts(!hidePosts);
  };

  return (
    <div>
      <form className='create-form' onSubmit={handlePostSubmit}>
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
        <div>
          <input
            className="img"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>
        <button className="submit" type="submit">
          Submit post
        </button>
      </form>

      {posts.length > 0 && (
        <div className="posts-wrapper-wrapper">
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
              {post.image && <img src={post.image} alt="Post Image" />}
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              {post.userId === authUser.uid && (
                <button className="remove-post" onClick={() => removePost(post.id)}>
                  Remove post
                </button>
              )}
              {hidePosts ? (
                <button className="show-post" onClick={togglePostVisibility}>
                  Show post
                </button>
              ) : (
                <div>
                  <hr />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
