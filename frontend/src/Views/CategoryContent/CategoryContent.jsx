// CategoryContents.js

import React, { useState, useEffect } from 'react';

const CategoryContents = ({ selectedCategory }) => {
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        if (selectedCategory) {
          const response = await fetch(
            `http://localhost:8080/api/posts?category=${selectedCategory}`
          );
          const data = await response.json();
          setCategoryPosts(data);
        }
      } catch (error) {
        console.error('Error fetching category posts:', error);
      }
    };

    fetchCategoryPosts();
  }, [selectedCategory]);

  return (
    <div>
      <h2>{`Posts in ${selectedCategory}`}</h2>
      {categoryPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryContents;



{/* <p>{post.content}</p>
<p>Important: {post.important ? 'Yes' : 'No'}</p>
<p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
<p>{post.imgUrl}</p> */}