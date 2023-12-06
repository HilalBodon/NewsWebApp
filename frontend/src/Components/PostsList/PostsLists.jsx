import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import FullScreenPost from '../PostCard/FullScreenPost';
import './PostsList.css'; // Import the CSS file with the styles

const PostList = ({ posts, selectedCategory }) => {
  const [categoryNames, setCategoryNames] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const categoryIds = [...new Set(posts.map((post) => post.category))];
        const categories = {};

        for (const categoryId of categoryIds) {
          const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
          const categoryData = await response.json();
          categories[categoryId] = categoryData.name;
        }

        setCategoryNames(categories);
      } catch (error) {
        console.error('Error fetching category names:', error);
      }
    };

    fetchCategoryNames();
  }, [posts]);

  const handleCardClick = (post) => {
    console.log('Card clicked:', post);
    setSelectedPost(post);
  };

  const handleCloseFullScreen = () => {
    console.log('Closing full-screen view');
    setSelectedPost(null);
  };

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) => categoryNames[post.category] === selectedCategory)
    : posts;

  // Group filtered posts by category
  const postsByCategory = filteredPosts.reduce((acc, post) => {
    const categoryName = categoryNames[post.category];

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(post);

    return acc;
  }, {});

  return (
    <div className="post-list-container">
      {Object.entries(postsByCategory).map(([categoryName, categoryPosts]) => (
        <div key={categoryName} className="category-container">
          <div className='h2'>{categoryName}</div>
          <div className="scroll-container ">
            <div className="scroll-content">
              {categoryPosts.map((post) => (
                <PostCard
                  key={post._id}
                  title={post.title}
                  content={post.content}
                  category={post.category}
                  createdAt={post.createdAt}
                  imgUrl={post.imgUrl}
                  onCardClick={() => handleCardClick(post)}
                />
              ))}
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













// import React, { useState, useEffect } from 'react';
// import PostCard from '../PostCard/PostCard';
// import FullScreenPost from '../PostCard/FullScreenPost';
// import './PostsList.css'; // Import the CSS file with the styles

// const PostList = ({ posts }) => {
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
//     console.log('Card clicked:', post);
//     setSelectedPost(post);
//   };

//   const handleCloseFullScreen = () => {
//     console.log('Closing full-screen view');
//     setSelectedPost(null);
//   };

//   // Group posts by category
//   const postsByCategory = posts.reduce((acc, post) => {
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

