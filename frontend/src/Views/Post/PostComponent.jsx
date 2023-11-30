import React, { useState, useEffect } from 'react';
import './PostComponent.css'; // Import your CSS file

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const url = editingPost ? `http://localhost:8080/api/posts/${editingPost._id}` : 'http://localhost:8080/api/posts';
  
      const response = await fetch(url, {
        method: editingPost ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        // Handle error response
        console.error('Error:', response.status, response.statusText);
        return;
      }
  
      fetchPosts();
      setEditingPost(null);
      setPostData({
        title: '',
        content: '',
        // Reset other fields
      });
    } catch (error) {
      console.error('Error creating/updating post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'DELETE',
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
        {/* Add other input fields as needed */}
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
