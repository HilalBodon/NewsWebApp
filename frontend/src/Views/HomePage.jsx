import React, { useState, useEffect } from 'react';
import PostList from '../Components/PostsLists';
import Navbar from '../Components/NavBar/Nav';


const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>My Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;


