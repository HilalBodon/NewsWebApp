// import React from 'react';
// import PostCard from './PostCard/PostCard';

// const PostList = ({ posts, onCardClick }) => {
//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//       {posts.map((post) => (
//         <PostCard
//           key={post._id}
//           title={post.title}
//           content={post.content}
//           category={post.category}
//           createdAt={post.createdAt}
//           imgUrl={post.imgUrl}
//           onCardClick={onCardClick} 
//         />
//       ))}
//     </div>
//   );
// };

// export default PostList;



// import React from 'react';
// import PostCard from './PostCard/PostCard';

// const PostList = ({ posts, onCardClick }) => {
//   // Group posts by category
//   const postsByCategory = posts.reduce((acc, post) => {
//     const category = post.category;

//     if (!acc[category]) {
//       acc[category] = [];
//     }

//     acc[category].push(post);

//     return acc;
//   }, {});

//   return (
//     <div>
//       {Object.entries(postsByCategory).map(([category, categoryPosts]) => (
//         <div key={category}>
//           <h2 className='my-5'>{category}</h2>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '1.25rem'}}>
//             {categoryPosts.map((post) => (
//               <PostCard
//                 key={post._id}
//                 title={post.title}
//                 content={post.content}
//                 category={post.category}
//                 createdAt={post.createdAt}
//                 imgUrl={post.imgUrl}
//                 onCardClick={onCardClick}
//               />
//             ))}
//           </div>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;



import React, { useState, useEffect } from 'react';
import PostCard from './PostCard/PostCard';

const PostList = ({ posts, onCardClick }) => {
  const [categoryNames, setCategoryNames] = useState({});

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

  // Group posts by category
  const postsByCategory = posts.reduce((acc, post) => {
    const categoryName = categoryNames[post.category];

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(post);

    return acc;
  }, {});

  return (
    <div>
      {Object.entries(postsByCategory).map(([categoryName, categoryPosts]) => (
        <div key={categoryName}>
          <h2 className='my-5'>{categoryName}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '2rem'}}>
            {categoryPosts.map((post) => (
              <PostCard
                key={post._id}
                title={post.title}
                content={post.content}
                // category={post.category}
                createdAt={post.createdAt}
                imgUrl={post.imgUrl}
                onCardClick={onCardClick}
              />
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PostList;
