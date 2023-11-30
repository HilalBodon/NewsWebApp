import React, { useState, useEffect } from 'react';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    // Add other fields as needed
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
      if (editingPost) {
        await fetch(`http://localhost:8080/api/posts/${editingPost._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
      } else {
        await fetch('http://localhost:8080/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
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
    <div>
      <h2>All Posts</h2>
      <div>
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

      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <div>
              <span>{post.title}</span>
              <button onClick={() => setEditingPost(post)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComponent;
