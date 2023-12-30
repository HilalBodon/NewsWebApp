import React, { useState, useEffect } from 'react';
import './PostCard.css';
import axios from 'axios';
import youTubeImg from './youTubeImg.png';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const PostCard = ({ Title, content, category, createdAt, videoUrl, imgUrl, onCardClick }) => {
  const formattedDate = new Date(createdAt).toLocaleString();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Posts/Categories',
          method: 'get',
          params: {
            "fields": "*",
            "order": "-objectId",
            "where": {

            },
          },
          headers: Headers
        });

        return response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategory();

  }, [category]);

  const handleClick = () => {
    const postDetails = { Title, content, category, createdAt, imgUrl, categoryName };

    if (videoUrl) {
      // If videoUrl is available, open a new window or tab with the YouTube link
      window.open(videoUrl, '_blank');
    } else {
      // If videoUrl is not available, perform the regular onCardClick action
      onCardClick(postDetails);
    }
  };

  const getYouTubeThumbnail = (videoUrl) => {
    const videoId = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` : null;
  };

  const thumbnailUrl = getYouTubeThumbnail(videoUrl);

  const truncateHtml = (html, maxLength) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;
  };
  const truncatedContent = truncateHtml(content, 50);



  return (
    <div className="post-card" onClick={handleClick}>
      {videoUrl ? (
        // Render a thumbnail image for YouTube videos with play icon overlay
        <div className="thumbnail-container">
          <img className="overlay-image" src={youTubeImg} alt="YouTube Overlay" />
          <img className="post-image" src={thumbnailUrl} alt="Video Thumbnail" />
        </div>
      ) : (
        // Render image if videoUrl is not available
        <img className="post-image" src={imgUrl} alt="Post Image" />
      )}
      <div className="post-header">
        <p className="post-title">{Title.length > 30 ? `...${Title.substring(0, 30)}` : Title}</p>
        <div className='post-content' dangerouslySetInnerHTML={{ __html: truncatedContent }} />
      </div>
      <p className="post-meta">{`${formattedDate}`}</p>
    </div>
  );
      }

export default PostCard;
