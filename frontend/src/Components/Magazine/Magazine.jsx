// import React, { useState, useEffect } from 'react';

// const MagazinePage = () => {
//   const [magazinePosts, setMagazinePosts] = useState([]);

//   useEffect(() => {
//     const fetchMagazinePosts = async () => {
//       try {
//         // Fetch magazine posts from your API endpoint
//         const response = await fetch('http://localhost:8080/api/magazine-posts');
//         const data = await response.json();
//         setMagazinePosts(data);
//       } catch (error) {
//         console.error('Error fetching magazine posts:', error);
//       }
//     };

//     fetchMagazinePosts();
//   }, []);

//   return (
//     <div>
//       <h2>Magazine</h2>
//       <ul>
//         {magazinePosts.map((post) => (
//           <li key={post._id}>
//             {/* You can customize the link appearance and behavior based on your needs */}
//             <a href={post.downloadLink} download>
//               {post.title}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MagazinePage;


import React from 'react';

const Magazine = () => {
  return (
    <div>
      <h2>Magazine Component</h2>
      {/* Add your content for the Magazine component */}
    </div>
  );
};

export default Magazine;
