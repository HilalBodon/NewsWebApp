
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar/Nav';
import NewsTicker from '../Components/NewsTicker/NewsTicker';
import PostList from '../Components/PostsLists';

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
      <PostList posts={posts}/>
      <div>
        <div className="text-2xl ">All Posts</div>
        {posts.map((post) => (
          <div className="flex justify-center text-gray-400" key={post._id}>
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



// HomePage.js
// import React from 'react';
// import PostCard from '../Components/PostCard/PostCard';

// const HomePage = () => {
//   const posts = [
//     // Your array of posts goes here
//     {
//       title: 'Post Title 1',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       author: 'John Doe',
//       createdAt: '2023-01-01T12:00:00Z',
//     },
//     // Add more posts as needed
//   ];

//   return (
//     <div>
//       <h1>Your Main Content Goes Here</h1>
//       {posts.map((post) => (
//         <PostCard
//           key={post.createdAt} // Assuming createdAt is unique for each post
//           title={post.title}
//           content={post.content}
//           author={post.author}
//           createdAt={post.createdAt}
//         />
//       ))}
//     </div>
//   );
// };

// export default HomePage;
