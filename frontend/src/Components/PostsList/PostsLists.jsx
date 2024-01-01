// import React, { useState, useEffect } from 'react';
// import PostCard from '../PostCard/PostCard';
// import FullScreenPost from '../PostCard/FullScreenPost';
// import './PostsList.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const PostList = ({ posts, selectedCategory }) => {
//   const [categoryNames, setCategoryNames] = useState({});
//   const [selectedPost, setSelectedPost] = useState(null);
//   const navigate = useNavigate();

//   const handleCardClick = (post) => {
//     setSelectedPost(post);
//     navigate(`/posts/${post.objectId}`);

//   };

//   const handleCloseFullScreen = () => {
//     setSelectedPost(null);
//   };

//   let catPosts = {};
//   for (let i = 0; i < posts.length; i++) {
//     const post = posts[i];
//     let category = post.categories[0];
//     post['categoryName'] = category.Name;
//     if (!catPosts.hasOwnProperty(category.objectId)) catPosts[category.objectId] = [];
//     catPosts[category.objectId].push(post);
//   }


//   return (
//     <div className="post-list-container">
//       {Object.entries(catPosts).map(([categoryId, categoryPosts]) => (
//         <div key={categoryId} className="category-container">
//           <div className='h2'>{categoryPosts[0].categoryName}</div>
//           <div className="scroll-container ">
//             <div className="scroll-content">
//               {categoryPosts.map((post) => {
//                 let imgurl2 = "https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png";
//                 try {
//                   imgurl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax300;
//                 } catch (e) {

//                 }
//                 return (
//                   <PostCard
//                     key={post._id}
//                     Title={post.Title}
//                     content={post.content}
//                     category={post.category}
//                     createdAt={post.createdAt}
//                     videoUrl={post.videoUrl}
//                     imgUrl={imgurl2}
//                     onCardClick={() => handleCardClick(post)}
//                   />
//                 );
//               }
//               )}
//             </div>
//           </div>
//           <hr className='bold' />
//         </div>
//       ))}

//       {selectedPost && (
//         <FullScreenPost post={selectedPost} onClose={handleCloseFullScreen} />
//       )}
//     </div>
//   );
// };

// export default PostList;




import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import FullScreenPost from '../PostCard/FullScreenPost';
import './PostsList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Img from "./default-Img.png";

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const PostList = ({ posts, selectedCategory }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (post) => {
    setSelectedPost(post);
    navigate(`/posts/${post.objectId}`);
  };

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

  categoriesArray.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

  console.log(posts.map(post => post.categories)); // This logs an array of categories for each post

  return (
    <div className="post-list-container">
      {categoriesArray.map(({ categoryName, posts }, index) => (
        <div key={index} className="category-container">
          <div className='h2'>{categoryName}</div>
          <div className="scroll-container">
            <div className="scroll-content">
              {posts.map((post) => {
                let imgurl2 = Img;
                try {
                  imgurl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax300;
                } catch (e) {

                }
                return (
                  <PostCard
                    key={post._id}
                    Title={post.Title}
                    content={post.content}
                    category={categoryName}
                    createdAt={post.createdAt}
                    videoUrl={post.videoUrl}
                    imgUrl={imgurl2}
                    onCardClick={() => handleCardClick(post)}
                  />
                );
              })}
            </div>
          </div>
          <hr className='bold' />
        </div>
      ))}

      {selectedPost && (
        <FullScreenPost post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default PostList;












// import React, { useState, useEffect } from 'react';
// import PostCard from '../PostCard/PostCard';
// import FullScreenPost from '../PostCard/FullScreenPost';
// import './PostsList.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const PostList = ({ posts, selectedCategory }) => {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const navigate = useNavigate();

//   const handleCardClick = (post) => {
//     setSelectedPost(post);
//     navigate(`/posts/${post.objectId}`);
//   };

//   // Array to specify the custom order of categories
//   const customCategoryOrder = ['أخبار ثقافية' ,'أخبار المخيم', 'صورة وكلمة', 'كبارنا'," أخبار المركز" ,'منصة رؤية'];

//   // Create an array to store category names and posts
//   const categoriesArray = posts.reduce((accumulator, post) => {
//     const category = post.categories[0];
//     const categoryName = category.Name;

//     // Find the category in the accumulator array
//     const existingCategory = accumulator.find((item) => item.categoryName === categoryName);

//     if (existingCategory) {
//       // If category already exists, push the post to its posts array
//       existingCategory.posts.push(post);
//     } else {
//       // If category doesn't exist, create a new entry in the accumulator array
//       accumulator.push({
//         categoryName,
//         posts: [post],
//       });
//     }

//     return accumulator;
//   }, []);

//   // Sort categoriesArray based on the custom order
//   categoriesArray.sort((a, b) => {
//     const orderA = customCategoryOrder.indexOf(a.categoryName);
//     const orderB = customCategoryOrder.indexOf(b.categoryName);

//     // If both categories are in the custom order, compare their indices
//     if (orderA !== -1 && orderB !== -1) {
//       return orderA - orderB;
//     }

//     // If only one category is in the custom order, prioritize it
//     if (orderA !== -1) {
//       return -1;
//     }

//     if (orderB !== -1) {
//       return 1;
//     }

//     // If neither category is in the custom order, use default sorting
//     return a.categoryName.localeCompare(b.categoryName);
//   });

//   return (
//     <div className="post-list-container">
//       {categoriesArray.map(({ categoryName, posts }, index) => (
//         <div key={index} className="category-container">
//           <div className='h2'>{categoryName}</div>
//           <div className="scroll-container">
//             <div className="scroll-content">
//               {posts.map((post) => {
//                 let imgurl2 = "https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png";
//                 try {
//                   imgurl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax300;
//                 } catch (e) {

//                 }
//                 return (
//                   <PostCard
//                     key={post._id}
//                     Title={post.Title}
//                     content={post.content}
//                     category={post.category}
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

//       {selectedPost && (
//         <FullScreenPost post={selectedPost} onClose={() => setSelectedPost(null)} />
//       )}
//     </div>
//   );
// };

// export default PostList;
