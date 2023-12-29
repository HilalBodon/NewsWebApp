
import React, { useState, useEffect } from 'react';
import PostInMainView from './PostInMainView'; // Update the path accordingly
import './MainSection.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import VideoSection from '../VideoSection/VideoSection';

const MainSection = ({ featuredPosts, onFeaturedPostClick, showVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (featuredPosts?.length || 1));
    }, 4000);

    return () => clearInterval(intervalId);
  }, [featuredPosts]);

  const handlePostClick = (post) => {
    navigate(`/posts/${post.objectId}`);
  };

  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

return (
  <div className="main-section">
    {showVideo === "1" ? (
      <VideoSection className="custom-video-section right-section" />
      ) : (
      <div className="right-section">
        <PostInMainView
          key={featuredPosts[currentIndex]?.id}
          post={featuredPosts[currentIndex]}
          isActive={true}
          onClick={() => handlePostClick(featuredPosts[currentIndex])}
        />
      </div>
    )}
    <div className="left-section">
      {featuredPosts.slice(0, 4).map((post) => (
        <PostInMainView
          key={post.id}
          post={post}
          isActive={true}
          onClick={() => handlePostClick(post)}
        />
      ))}
    </div>
  </div>
);
}

export default MainSection;




