import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import Navbar from '../../Components/NavBar/Nav';
import NewsTicker from '../../Components/NewsTicker/NewsTicker';
import PostList from '../../Components/PostsLists';
import Footer from '../../Components/Footer/Footer';
import PostCard from '../../Components/PostCard/PostCard';
import CategoryComponent from '../Category/CategoryComponent';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts?sort=createdAt,important');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleOverlayToggle = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <div>
      <Navbar />
      <NewsTicker />
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/bNyUyrR0PHo"
          title="Playing Video From YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <hr />
      <div className='cards-div'>
<PostList posts={posts} onCardClick={handleOverlayToggle} />
      </div>
      <div>
        <div className="text-2xl">All Posts</div>
        {posts.map((post) => (
          <div className="flex justify-center text-gray-400" key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Important: {post.important ? 'Yes' : 'No'}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.imgUrl}</p>

          </div>
        ))}
        {isOverlayVisible && (
          <div className="overlay" onClick={handleOverlayToggle}>
            <div className="overlay-content">
              <PostCard />
            </div>
          </div>
        )}

      <div>
      <CategoryComponent />
      </div>

      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
