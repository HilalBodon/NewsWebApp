import React, { useState, useEffect } from 'react';
import './PostCard.css';

const PostCard = ({ title, content, category, createdAt, imgUrl }) => {
  const formattedDate = new Date(createdAt).toLocaleString();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categories/${category}`);
        const categoryData = await response.json();
        setCategoryName(categoryData.name);
        console.log(categoryData);

      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [category]);

  return (
    <div className="post-card">
      <img className="post-image" src={imgUrl} alt="Post Image" />
      <div className="post-header">
        <p className="post-title">{title}</p>
        <p className="post-content">{content.length > 50 ? `${content.substring(0, 50)}...` : content}</p>
      </div>
      <p className="post-meta">{` on ${formattedDate}`}</p> 
      {/* ${categoryName} */}
    </div>
  );
};

export default PostCard;


// import React from 'react';
// import './PostCard.css';

// const PostCard = ({ title, content, category, createdAt, imgUrl }) => {
//   const formattedDate = new Date(createdAt).toLocaleString();

//   return (
//     <div className="post-card">

//       <img className="post-image" src={imgUrl} alt="Post Image" />
//       <div className="post-header">
//         <p className="post-title">{title}</p>
//         <p className="post-content">{content.length > 50 ? `${content.substring(0, 50)}...` : content}</p>

//       </div>
//       <p className="post-meta">{`${category} on ${formattedDate}`}</p>
//     </div>
//   );
// };

// export default PostCard;
