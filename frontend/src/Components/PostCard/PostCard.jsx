import React, { useState, useEffect } from 'react';
import './PostCard.css';
import axios from 'axios';


const BaseURL = 'https://www.beaapis.com/1';
const Headers = {
  'X-BEA-Application-Id': 'Fdo32NoHF7H3ur5tzT0zp7S_QMOnW6zhEVab3U37zEk',
  'X-BEA-Authorization': 'mDbKLYBJOOqxVlZuW4ov6Vk_66EeqILi3qG7-hOipM0',
};

const PostCard = ({ Title, content, category, createdAt, imgUrl, onCardClick }) => {
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
    onCardClick({ Title, content, category, createdAt, imgUrl, categoryName });
  };


  const truncateHtml = (html, maxLength) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;
  };
  
    const truncatedContent = truncateHtml(content, 50);
  

  return (
    <div className="post-card" onClick={handleClick} >
      <img className="post-image" src={imgUrl} alt="Post Image" />
      <div className="post-header">
        <p className="post-title">{Title.length > 30 ? `...${Title.substring(0, 30)}` : Title}</p>
        <div className='post-content' dangerouslySetInnerHTML={{ __html: truncatedContent }} />
      </div>
      <p className="post-meta">{` on ${formattedDate}`}</p>
    </div>
  );
};

export default PostCard;

