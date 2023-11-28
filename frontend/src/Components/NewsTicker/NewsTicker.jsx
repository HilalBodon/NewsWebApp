// NewsTicker.js
import React, { useEffect } from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
  useEffect(() => {
    // Start the animation after a short delay
    const newsContainer = document.getElementById('news-container');
    setTimeout(() => {
      newsContainer.style.animationPlayState = 'running';
    }, 1000);
  }, []);

  return (
    <div className="news-ticker">
      <div className="news-container" id="news-container">
        <div className="news-item">Breaking News 1: Lorem ipsum dolor sit amet.</div>
        <div className="news-item">Breaking News 2: Consectetur adipiscing elit.</div>
        <div className="news-item">Breaking News 3: Sed do eiusmod tempor incididunt.</div>
        {/* Add more news items as needed */}
      </div>
    </div>
  );
};

export default NewsTicker;
