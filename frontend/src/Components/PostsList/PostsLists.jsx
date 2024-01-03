// import React, { useState, useEffect } from 'react';
// import PostCard from '../PostCard/PostCard';
// import FullScreenPost from '../PostCard/FullScreenPost';
// import './PostsList.css';
// import { useNavigate } from 'react-router-dom';
// import Img from "./default-Img.png";

// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const PostList = ({ posts, selectedCategory }) => {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const navigate = useNavigate();


//   const [visibleCategoryIndex, setVisibleCategoryIndex] = useState(0);

//   const handleArrowClick = (direction) => {
//     if (direction === 'left' && visibleCategoryIndex > 0) {
//       setVisibleCategoryIndex(visibleCategoryIndex - 1);
//     } else if (direction === 'right' && visibleCategoryIndex < categoriesArray.length - 1) {
//       setVisibleCategoryIndex(visibleCategoryIndex + 1);
//     }
//   };




//   const handleCardClick = (post) => {
//     setSelectedPost(post);
//     navigate(`/posts/${post.objectId}`);
//   };

//   const categoriesArray = posts.reduce((accumulator, post) => {
//     const category = post.categories[0];
//     const categoryName = category.Name;

//     const existingCategory = accumulator.find((item) => item.categoryName === categoryName);

//     if (existingCategory) {
//       existingCategory.posts.push(post);
//     } else {
//       accumulator.push({
//         categoryName,
//         posts: [post],
//       });
//     }

//     return accumulator;
//   }, []);

//   categoriesArray.sort((a, b) => a.categoryName.localeCompare(b.categoryName));


//   return (
//     <div className="post-list-container">

//       {/* Left arrow */}
//       {visibleCategoryIndex > 0 && (
//         <button className="arrow left" onClick={() => handleArrowClick('left')}>
//           &lt;
//         </button>
//       )}

//       {categoriesArray.map(({ categoryName, posts }, index) => (
//         <div key={index} className="category-container">
//           <div className='h2'>{categoryName}</div>
//           <div className="scroll-container">
//             <div className="scroll-content">
//               {posts.map((post) => {
//                 let imgurl2 = Img;
//                 try {
//                   imgurl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax300;
//                 } catch (e) {

//                 }
//                 return (
//                   <PostCard
//                     key={post._id}
//                     Title={post.Title}
//                     content={post.content}
//                     category={categoryName}
//                     createdAt={post.createdAt}
//                     videoUrl={post.videoUrl}
//                     imgUrl={imgurl2}
//                     onCardClick={() => handleCardClick(post)}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//           <hr className='bold' />
//         </div>
//       ))}

//       {/* Right arrow */}
//       {visibleCategoryIndex < categoriesArray.length - 1 && (
//         <button className="arrow right" onClick={() => handleArrowClick('right')}>
//           &gt;
//         </button>
//       )}

//       {selectedPost && (
//         <FullScreenPost post={selectedPost} onClose={() => setSelectedPost(null)} />
//       )}
//     </div>
//   );
// };

// export default PostList;

import React, { useState, useEffect, useRef } from 'react';
import PostCard from '../PostCard/PostCard';
import FullScreenPost from '../PostCard/FullScreenPost';
import './PostsList.css';
import { useNavigate } from 'react-router-dom';
import Img from './default-Img.png';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const PostList = ({ posts, selectedCategory }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  const [visibleCategoryIndex, setVisibleCategoryIndex] = useState(0);
  const containerRef = useRef(null);
  const categoriesArrayRef = useRef([]);

  useEffect(() => {
    containerRef.current = Array.from({ length: categoriesArrayRef.current.length }, () => React.createRef());
  }, [categoriesArrayRef.current]);

  const handleArrowClick = (direction, index) => {
    // console.log('Button clicked:', direction, index);
  
    const container = document.getElementById(`scroll-container-${index}`);
    if (!container) return;
  
    const style = window.getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    const scrollDistance = container.offsetWidth - paddingLeft - paddingRight + 24 // Adjusted by 16px
  
    if (direction === 'left' && visibleCategoryIndex >= 0) {
      setVisibleCategoryIndex(visibleCategoryIndex);
      container.scrollLeft -= scrollDistance;
    } else if (direction === 'right' && visibleCategoryIndex < categoriesArrayRef.current.length - 1) {
      setVisibleCategoryIndex(visibleCategoryIndex);
      container.scrollLeft += scrollDistance;
    }
  };
  
  const handleCardClick = (post) => {
    setSelectedPost(post);
    navigate(`/posts/${post.objectId}`);
  };

  useEffect(() => {
    const categoriesArray = posts.reduce((accumulator, post) => {
      const category = post.categories[0];
      const categoryName = category.Name;

      const existingCategory = accumulator.find((item) => item.categoryName === categoryName);

      if (existingCategory) {
        existingCategory.posts.push(post);
      } else {
        accumulator.push({
          categoryName,
          posts: [post],
        });
      }

      return accumulator;
    }, []);

    categoriesArrayRef.current = categoriesArray;
  }, [posts]);


  return (
    <div className="post-list-container">
     {categoriesArrayRef.current.map(({ categoryName, posts }, index) => (
 <div key={index} className="category-container">
    <div className="h2">{categoryName}</div>
    <div className='post-list-LRbuttons'>
    <div className="arrow left" onClick={() => handleArrowClick('left', index)}>
      &lt;
    </div>
    <div className="scroll-container" id={`scroll-container-${index}`}>
      <div className="scroll-content">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            Title={post.Title}
            content={post.content}
            category={categoryName}
            createdAt={post.createdAt}
            videoUrl={post.videoUrl}
            imgUrl={post.images?.untitled[0]?.dir + post.images?.untitled[0]?.imageax300 || Img}
            onCardClick={() => handleCardClick(post)}
          />
        ))}
      </div>
    </div>
    <div className="arrow right" onClick={() => handleArrowClick('right', index)}>
      &gt;
    </div>
    </div>
    <hr className="bold" />
 </div>
))}

      {selectedPost && <FullScreenPost post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default PostList;