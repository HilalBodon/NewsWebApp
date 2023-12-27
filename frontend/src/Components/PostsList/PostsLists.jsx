import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import FullScreenPost from '../PostCard/FullScreenPost';
import './PostsList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const PostList = ({ posts, selectedCategory }) => {
  const [categoryNames, setCategoryNames] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();


  const handleCardClick = (post) => {
    setSelectedPost(post);
    navigate(`/posts/${post.objectId}`);

  };

  const handleCloseFullScreen = () => {
    setSelectedPost(null);
  };

  let catPosts = {};
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let category = post.categories[0];
    post['categoryName'] = category.Name;
    if (!catPosts.hasOwnProperty(category.objectId)) catPosts[category.objectId] = [];
    catPosts[category.objectId].push(post);
  }


  return (
    <div className="post-list-container">
      {Object.entries(catPosts).map(([categoryId, categoryPosts]) => (
        <div key={categoryId} className="category-container">
          <div className='h2'>{categoryPosts[0].categoryName}</div>
          <div className="scroll-container ">
            <div className="scroll-content">
              {categoryPosts.map((post) => {
                let imgurl2 = "https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png";
                try {
                  imgurl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax300;
                } catch (e) {

                }
                return (
                  <PostCard
                    key={post._id}
                    Title={post.Title}
                    content={post.content}
                    category={post.category}
                    createdAt={post.createdAt}
                    imgUrl={imgurl2}
                    onCardClick={() => handleCardClick(post)}
                  />
                );
              }
              )}
            </div>
          </div>
          <hr className='bold' />
        </div>
      ))}

      {selectedPost && (
        <FullScreenPost post={selectedPost} onClose={handleCloseFullScreen} />
      )}
    </div>
  );
};

export default PostList;





  // useEffect(() => {

  //   const fetchCategoryNames = async () => {
  //     try {
  //       const categoryIds = [...new Set(posts.map((post) => post.category))];
  //       const categories = {};

  //       for (const categoryId of categoryIds) {
  //         const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
  //         const categoryData = await response.json();
  //         categories[categoryId] = categoryData.name;
  //       }

  //       setCategoryNames(categories);
  //     } catch (error) {
  //       console.error('Error fetching category names:', error);
  //     }
  //   };

  //   fetchCategoryNames();
  // }, [posts]);







  // useEffect(() => {
  //   // console.log('Type of posts:', typeof posts); 

  //   const fetchCategoryNames = async (categoryIds) => {
  //     try {
  //       const categories = {};

  //       for (const categoryId of categoryIds) {
  //         const response = await axios({
  //           url: `${BaseURL}/Categories/${categoryId}`,
  //           method: 'get',
  //           headers: Headers,
  //         });

  //         const categoryData = response.data.results;
  //         if (categoryData && categoryData.name) {
  //           categories[categoryId] = categoryData.name;

  //         } else {
  //           console.error(`Category data is undefined or missing name for category ID: ${categoryId}`);
  //         }
  //       }
  //       console.log("category data" , categories)

  //       return categories;
  //     } catch (error) {
  //       console.error('Error fetching category names:', error);
  //       throw error; // Rethrow the error to handle it in the calling function if needed
  //     }
  //   };

  //   const fetchCategoryNamesAndSet = async () => {
  //     try {
  //       if (!Array.isArray(posts)) {
  //         console.error('Posts is not an array');
  //         return;
  //       }

  //       const categoryIds = [...new Set(posts.map((post) => post.category))];

  //       for (const categoryId of categoryIds) {
  //         if (categoryId) {  
  //           try {
  //             const categories = await fetchCategoryNames([categoryId]);
  //             setCategoryNames((prevCategories) => ({ ...prevCategories, ...categories }));
  //           } catch (error) {
  //             console.error('Error fetching category names:', error);
  //           }
  //         } else {

  //           console.error('Category ID is undefined');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching category names:', error);
  //     }
  //   };


  //   fetchCategoryNamesAndSet();
  // }, [posts]);

