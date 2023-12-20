// import React, { useState, useEffect } from 'react';
// import PostCard from '../PostCard/PostCard';
// import FullScreenPost from '../PostCard/FullScreenPost';
// import './PostsList.css'; 
// import axios from 'axios';

// const BaseURL = 'https://www.beaapis.com/1';
// const Headers = {
//   'X-BEA-Application-Id': 'Fdo32NoHF7H3ur5tzT0zp7S_QMOnW6zhEVab3U37zEk',
//   'X-BEA-Authorization': 'mDbKLYBJOOqxVlZuW4ov6Vk_66EeqILi3qG7-hOipM0',
// };


// const PostList = ({ posts, selectedCategory }) => {
//   const [categoryNames, setCategoryNames] = useState({});
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     const fetchCategoryNames = async () => {
//       try {
//         const categoryIds = [...new Set(posts.map((post) => post.category))];
//         const categories = {};

//         for (const categoryId of categoryIds) {
//           const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
//           const categoryData = await response.json();
//           categories[categoryId] = categoryData.name;
//         }

//         setCategoryNames(categories);
//       } catch (error) {
//         console.error('Error fetching category names:', error);
//       }
//     };

//     fetchCategoryNames();
//   }, [posts]);

//   const handleCardClick = (post) => {
//     setSelectedPost(post);
//   };

//   const handleCloseFullScreen = () => {
//     setSelectedPost(null);
//   };

//   const filteredPosts = selectedCategory
//     ? posts.filter((post) => categoryNames[post.category] === selectedCategory)
//     : posts;

//   const postsByCategory = filteredPosts.reduce((acc, post) => {
//     const categoryName = categoryNames[post.category];

//     if (!acc[categoryName]) {
//       acc[categoryName] = [];
//     }

//     acc[categoryName].push(post);

//     return acc;
//   }, {});

//   return (
//     <div className="post-list-container">
//       {Object.entries(postsByCategory).map(([categoryName, categoryPosts]) => (
//         <div key={categoryName} className="category-container">
//           <div className='h2'>{categoryName}</div>
//           <div className="scroll-container ">
//             <div className="scroll-content">
//               {categoryPosts.map((post) => (
//                 <PostCard
//                   key={post._id}
//                   title={post.title}
//                   content={post.content}
//                   category={post.category}
//                   createdAt={post.createdAt}
//                   imgUrl={post.imgUrl}
//                   onCardClick={() => handleCardClick(post)}
//                 />
//               ))}
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

const BaseURL = 'https://www.beaapis.com/1';
const Headers = {
  'X-BEA-Application-Id': 'Fdo32NoHF7H3ur5tzT0zp7S_QMOnW6zhEVab3U37zEk',
  'X-BEA-Authorization': 'mDbKLYBJOOqxVlZuW4ov6Vk_66EeqILi3qG7-hOipM0',
};


const PostList = ({ posts, selectedCategory }) => {
  const [categoryNames, setCategoryNames] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);


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







  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseFullScreen = () => {
    setSelectedPost(null);
  };


  // console.log("posts in the postlist", posts);


  let catPosts = {};
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let category = post.categories[0];
    post['categoryName'] = category.Name;
    if (!catPosts.hasOwnProperty(category.objectId)) catPosts[category.objectId] = [];
    catPosts[category.objectId].push(post);
  }



  // const filteredPosts = selectedCategory
  //   ? posts.filter((post) => categoryNames[post.category] === selectedCategory)
  //   : { results: [] };

  // console.log('filteredPosts:', filteredPosts);

  // const postsByCategory = filteredPosts.results.reduce((acc, post) => {
  //   const categoryName = categoryNames[post.category];

  //   if (!acc[categoryName]) {
  //     acc[categoryName] = [];
  //   }

  //   acc[categoryName].push(post);

  //   return acc;
  // }, {});


  return (
    <div className="post-list-container">
      {Object.entries(catPosts).map(([categoryId, categoryPosts]) => (
        <div key={categoryId} className="category-container">
          <div className='h2'>{categoryPosts[0].categoryName}</div>
          <div className="scroll-container ">
            <div className="scroll-content">
              {categoryPosts.map((post) => {


                let imgurl2 = "";
                try {
                  console.log(post);
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

