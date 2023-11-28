import React from 'react';
import './PostCard.css';

const PostCard = ({ title, content, category, createdAt, imgUrl }) => {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="post-card">

      <img className="post-image" src={imgUrl} alt="Post Image" />
      <div className="post-header">
        <p className="post-title">{title}</p>
        <textarea className="post-content">{content}</textarea>
      </div>
      <p className="post-meta">{`${category} on ${formattedDate}`}</p>
    </div>
  );
};

export default PostCard;


// import React from 'react';
// import './PostCard.css';

// const PostCard = ({ title, content, category, createdAt, imgUrl, onCardClick }) => {
//   const formattedDate = new Date(createdAt).toLocaleString();

//   const handleCardClick = () => {
//     // Call the callback function to show the overlay
//     onCardClick();
//   };

//   return (
//     <div className="post-card" onClick={handleCardClick}>
//        <img className="post-image" src={imgUrl} alt="Post Image" />
//       <div className="post-header">
//         <h2 className="post-title">{title}</h2>
//         <p className="post-meta">{`${category} on ${formattedDate}`}</p>
//       </div>
//       <p className="post-content">{content}</p>
//     </div>
//   );
// };

// export default PostCard;
