
import React, { useState, useEffect } from 'react';
import PostInMainView from './PostInMainView'; 
import './MainSection.css'; 
import { useNavigate } from 'react-router-dom';
import VideoSection from '../VideoSection/VideoSection';
import axios from 'axios';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const MainSection = ({ onFeaturedPostClick, showVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

        const fetchFeaturedPosts = async () => {
          try {
            let url = BaseURL + '/Posts';
            const response = await axios({
              url,
              method: 'get',
              params: {
                "fields": "*",
                "order": "-createdAt",
                "media": "images,files",
                "crops": "ax300,ax1000",
                "limit": "100",
                "where": {
                  "featured": "1"
                },
              },
              headers: Headers,
            });
            const responseData = response.data;
            const postsData = responseData.results || [];
            setFeaturedPosts(postsData);
    
          } catch (error) {
            console.error('Error fetching featured posts:', error);
          }
        };
    
        fetchFeaturedPosts();


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




