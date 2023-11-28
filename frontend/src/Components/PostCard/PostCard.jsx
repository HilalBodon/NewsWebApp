import React from 'react';
import './PostCard.css';

const PostCard = ({ title, content, category, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{title}</h2>
        <p className="post-meta">{`${category} on ${formattedDate}`}</p>
      </div>
      <p className="post-content">{content}</p>
    </div>
  );
};

export default PostCard;