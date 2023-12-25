// PostInMainView.jsx
import React from 'react';
import './MainSection.css';

const PostInMainView = ({ post, isActive }) => {
    const formattedDate = new Date(post.createdAt).toLocaleString();

  const imgUrl =
    post.images?.untitled?.[0]?.dir + post.images?.untitled?.[0]?.imageax300 ||
    'https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png';

  return (
    <div   className={`post-view ${isActive ? 'active' : ''}`} >
      <img className="post-image" src={imgUrl} alt="Post Image" />
      <div className="post-content">
        <h2 className="post-title">{post.Title}</h2>
        <p className="post-meta">{`${formattedDate}`}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }} className="post-description" /> */}
      </div>
    </div>
  );
};

export default PostInMainView;
