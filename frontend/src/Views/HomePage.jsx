// import React, { useState, useEffect } from 'react';
// import PostList from '../Components/PostsLists';
// import Navbar from '../Components/NavBar/Nav';
// import NewsTicker from '../Components/NewsTicker/NewsTicker';

// const HomePage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:8080/api/posts');
//       const data = await response.json();
//       setPosts(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Navbar/>
//       <NewsTicker />
//       <PostList posts={posts} />
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar/Nav';
import NewsTicker from '../Components/NewsTicker/NewsTicker';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts?sort=important');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Your Main Content Goes Here</h1>
      <NewsTicker />
      <div>
        <h2>All Posts</h2>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Categories: {post.categories.join(', ')}</p>
            <p>Important: {post.importance ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

