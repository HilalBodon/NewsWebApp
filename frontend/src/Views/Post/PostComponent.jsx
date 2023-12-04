import React, { useState, useEffect } from 'react';
import './PostComponent.css'; // Import your CSS file

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    important: false,
    imgUrl: '',
  });

 const YOUR_JWT_TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY0ZTlmN2NkZGU2MDFmNTZjMmJhNDgiLCJpYXQiOjE3MDE3MDk2NDIsImV4cCI6MTcwMTc1Mjg0Mn0.VgkmGrc6qp7lbOaRg0KsOz-jWqEzICHK12sNmxfPRD8"

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        headers: {
          Authorization: `Bearer ${YOUR_JWT_TOKEN}`, // Replace YOUR_JWT_TOKEN with the actual JWT token
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

//   const handleCreateOrUpdate = async () => {
//     try {
//       const url = editingPost ? `http://localhost:8080/api/posts/${editingPost._id}` : 'http://localhost:8080/api/posts';

//       const response = await fetch(url, {
//         method: editingPost ? 'PATCH' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${YOUR_JWT_TOKEN}`,// Replace YOUR_JWT_TOKEN with the actual JWT token
//         },
//         body: JSON.stringify(postData),
//       });

//       if (!response.ok) {
//         console.error('Error:', response.status, response.statusText);
//         const errorData = await response.json(); // Log additional error details
//         console.error('Error Data:', errorData);
//         return;
//       }

//       fetchPosts();
//       setEditingPost(null);
//       setPostData({
//         title: '',
//         content: '',
//         category: '',
//         important: false,
//         imgUrl: '',
//       });
//     } catch (error) {
//         console.error('Error creating/updating post:', error);
//     }
//   };




const handleCreateOrUpdate = async () => {
    try {
      const url = editingPost ? `http://localhost:8080/api/posts/${editingPost._id}` : 'http://localhost:8080/api/posts';
  
      const response = await fetch(url, {
        method: editingPost ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${YOUR_JWT_TOKEN}`, // Replace YOUR_JWT_TOKEN with the actual JWT token
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized (token expired) error
          console.error('Token expired. Please log in.');
          // You can redirect to the login page or show a login prompt
          return;
        }
  
        console.error('Error:', response.status, response.statusText);
        const errorData = await response.json(); // Log additional error details
        console.error('Error Data:', errorData);
        return;
      }
  
      fetchPosts();
      setEditingPost(null);
      setPostData({
        title: '',
        content: '',
        category: '',
        important: false,
        imgUrl: '',
      });
    } catch (error) {
      console.error('Error creating/updating post:', error);
    }
  };
  
  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${YOUR_JWT_TOKEN}`, // Replace YOUR_JWT_TOKEN with the actual JWT token
        },
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post-container">
      <h2>All Posts</h2>
      <div className="post-form">
        <input
          type="text"
          placeholder="Enter post title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          placeholder="Enter post content"
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
        />

        {/* Category Dropdown */}
        <select
          value={postData.category}
          onChange={(e) => setPostData({ ...postData, category: e.target.value })}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Importance Checkbox */}
        <label>
          <input
            type="checkbox"
            checked={postData.important}
            onChange={() => setPostData({ ...postData, important: !postData.important })}
          />
          Important
        </label>

        {/* Image URL Input */}
        <input
          type="text"
          placeholder="Enter image URL"
          value={postData.imgUrl}
          onChange={(e) => setPostData({ ...postData, imgUrl: e.target.value })}
        />

        <button onClick={handleCreateOrUpdate}>{editingPost ? 'Update Post' : 'Create Post'}</button>
      </div>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <div>
              <span>{post.title}</span>
              <div className="button-container">
                <button className="edit-button" onClick={() => setEditingPost(post)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default PostComponent;
