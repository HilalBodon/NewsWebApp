// import React, { useState, useEffect } from 'react';

// function MoreSettings({ onNewsTickerToggle }) {
//   // Retrieve the state from localStorage or use the default value
//   const [showNewsTicker, setShowNewsTicker] = useState(() => {
//     const storedValue = localStorage.getItem('showNewsTicker');
//     return storedValue ? JSON.parse(storedValue) : true;
//   });

//   // Update localStorage whenever the state changes
//   useEffect(() => {
//     localStorage.setItem('showNewsTicker', JSON.stringify(showNewsTicker));
//     onNewsTickerToggle(showNewsTicker);
//   }, [showNewsTicker, onNewsTickerToggle]);

//   const handleCheckboxChange = () => {
//     // Update the state, and it will trigger the useEffect to update localStorage
//     setShowNewsTicker((prev) => !prev);
//   };

//   return (
//     <div>
//       <label>
//         Show/Hide NewsTicker
//         <input type="checkbox" checked={showNewsTicker} onChange={handleCheckboxChange} />
//       </label>
//     </div>
//   );
// }

// export default MoreSettings;


import React, { useState, useEffect } from 'react';
import './MoreSettings.css';

function MoreSettings({ onNewsTickerToggle, onVideoToggle, onUpdateVideoLink }) {
  const [showNewsTicker, setShowNewsTicker] = useState(() => {
    const storedValue = localStorage.getItem('showNewsTicker');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const [showVideo, setShowVideo] = useState(() => {
    const storedValue = localStorage.getItem('showVideo');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const [videoLink, setVideoLink] = useState(() => {
    const storedValue = localStorage.getItem('videoLink');
    return storedValue || ''; // Set default value to an empty string
  });

  useEffect(() => {
    localStorage.setItem('showNewsTicker', JSON.stringify(showNewsTicker));
    onNewsTickerToggle(showNewsTicker);
  }, [showNewsTicker, onNewsTickerToggle]);

  useEffect(() => {
    localStorage.setItem('showVideo', JSON.stringify(showVideo));
    onVideoToggle(showVideo);
  }, [showVideo, onVideoToggle]);

  useEffect(() => {
    localStorage.setItem('videoLink', videoLink);
    onUpdateVideoLink(videoLink);
  }, [videoLink, onUpdateVideoLink]);

  const handleCheckboxChange = (setter) => {
    setter((prev) => !prev);
  };

  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
  };

  const handleUpdateVideoLink = (newVideoLink) => {
    console.log('Updated video link:', newVideoLink);
  };
  

  return (
    <div>
      <div className='more-settings-main'>
        <div>
          <label>
            Show/Hide NewsTicker
            <input type="checkbox" checked={showNewsTicker} onChange={() => handleCheckboxChange(setShowNewsTicker)} />
          </label>
        </div>

        <div>
          <label>
            Show/Hide Video
            <input type="checkbox" checked={showVideo} onChange={() => handleCheckboxChange(setShowVideo)} />
          </label>
        </div>

        <div>
          <label>
            Video Link:
            <input type="text" value={videoLink} onChange={handleVideoLinkChange} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default MoreSettings;
