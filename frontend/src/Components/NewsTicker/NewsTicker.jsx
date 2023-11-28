// // NewsTicker.js
// import React, { useEffect } from 'react';
// import './NewsTicker.css';

// const NewsTicker = () => {
//   useEffect(() => {
//     // Start the animation after a short delay
//     const newsContainer = document.getElementById('news-container');
//     setTimeout(() => {
//       newsContainer.style.animationPlayState = 'running';
//     }, 1000);
//   }, []);

//   return (
//     <div className="news-ticker">
//       <div className="news-container" id="news-container">
//         <div className="news-item">Breaking News 1: Lorem ipsum dolor sit amet.</div>
//         <div className="news-item">Breaking News 2: Consectetur adipiscing elit.</div>
//         <div className="news-item">Breaking News 3: Sed do eiusmod tempor incididunt.</div>
//         {/* Add more news items as needed */}
//       </div>
//     </div>
//   );
// };

// export default NewsTicker;

import React, { useEffect, useState } from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
  const [importantPosts, setImportantPosts] = useState([]);

  useEffect(() => {
    const fetchImportantPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts?important=true');
        const data = await response.json();
        setImportantPosts(data);
      } catch (error) {
        console.error('Error fetching important posts:', error);
      }
    };

    fetchImportantPosts();
  }, []);

  return (
    <div className="news-ticker">
      <div className="news-container" id="news-container">
        {importantPosts.map((post) => (
          <div className="news-item" key={post._id}>
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
