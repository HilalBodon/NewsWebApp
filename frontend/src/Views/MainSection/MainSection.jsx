// import React from 'react';

// const MainSection = ({ featuredPosts, onFeaturedPostClick }) => {
//   return (
    
//     <div className="main-section">
//       <div className="featured-posts">
//         {featuredPosts.map((post) => {
//           let imgUrl2 = "https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png";
//           try {
//             imgUrl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax300;
//             console.log("post",post)
//           } catch (e) {
//           }
// console.log(post)
//           return (
//             <div key={post.id} className="featured-post">
//               <h2>{post.Title}</h2>
//               <div dangerouslySetInnerHTML={{ __html: post.content }} className="" />
//               <img className="post-image" src={imgUrl2} alt="Post Image" />
//               <hr />
//               {/* Add more details or components as needed */}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MainSection;
// MainSection.jsx



import React, { useState, useEffect } from 'react';
import PostInMainView from './PostInMainView'; // Update the path accordingly
import './MainSection.css'; // Import your CSS file

const MainSection = ({ featuredPosts, onFeaturedPostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (featuredPosts?.length || 1));
    }, 4000); // Adjust the interval time as needed

    return () => clearInterval(intervalId);
  }, [featuredPosts]);

  if (!featuredPosts || featuredPosts.length === 0) {
    return null; // or display a loading message or component
  }

  return (
    <div className="main-section">
        <div className="right-section">
        <PostInMainView key={featuredPosts[currentIndex]?.id} post={featuredPosts[currentIndex]} isActive={true} />
      </div>
      <div className="left-section">
        {/* Render the first 4 posts in the left section */}
        {featuredPosts.slice(0, 4).map((post) => (
          <PostInMainView key={post.id} post={post} isActive={true} />
        ))}
      </div>

    </div>
  );
};

export default MainSection;




