import React, { useState, useEffect } from 'react';
import './MoreSettings.css';

function MoreSettings({ onNewsTickerToggle, onVideoToggle, onUpdateVideoLink }) {
  const [showNewsTicker, setShowNewsTicker] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/settings');
        const data = await response.json();
        setShowNewsTicker(data.showNewsTicker);
        setShowVideo(data.showVideo);
        setVideoLink(data.videoLink || '');
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleCheckboxChange = (setter) => {
    setter((prev) => {
      const newValue = !prev;
      updateSettings(newValue, setter);  // Pass the setter function to ensure the correct state is used
      return newValue;
    });
  };
  
  const updateSettings = async (newValue, setter) => {
    try {
      const response = await fetch('http://localhost:8080/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showNewsTicker: setter === setShowNewsTicker ? newValue : showNewsTicker ? 1 : 0,
          showVideo: setter === setShowVideo ? newValue ? 1 : 0 : showVideo ? 1 : 0,
          videoLink,
        }),
      });
      const data = await response.json();
      console.log('Updated settings:', data.success);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };
  
  

  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
  };


//   const updateSettings = async (newValue) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/settings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           showNewsTicker: newValue ? 1 : 0,
//           showVideo: showVideo ? 1 : 0,
//           videoLink,
//         }),
//       });
//       const data = await response.json();
//       console.log('Updated settings:', data.success);
//     } catch (error) {
//       console.error('Error updating settings:', error);
//     }
//   };

  const handleUpdateVideoLink = async () => {
    updateSettings(showNewsTicker);
    console.log("link updated successfully")
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
            <input type="text" value={videoLink} onChange={handleVideoLinkChange}/> 
            {/*  */}
            <button onClick={handleUpdateVideoLink}>Update Video Link</button>
          </label>
        </div>
      </div>
    </div>
  );
}

export default MoreSettings;










// import React, { useState, useEffect } from 'react';
// import './MoreSettings.css';

// function MoreSettings({ onNewsTickerToggle, onVideoToggle, onUpdateVideoLink }) {
//   const [showNewsTicker, setShowNewsTicker] = useState(true);
//   const [showVideo, setShowVideo] = useState(true);
//   const [videoLink, setVideoLink] = useState('');

//   useEffect(() => {
//     // Fetch initial settings from the database when the component mounts
//     const fetchSettings = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/settings');
//         const data = await response.json();

//         // Update component state with fetched settings
//         setShowNewsTicker(data.showNewsTicker);
//         setShowVideo(data.showVideo);
//         setVideoLink(data.videoLink || '');
//       } catch (error) {
//         console.error('Error fetching settings:', error);
//       }
//     };

//     fetchSettings();
//   }, []);

// //   useEffect(() => {
// //     // Update localStorage whenever the state changes
// //     localStorage.setItem('showNewsTicker', JSON.stringify(showNewsTicker));
// //     onNewsTickerToggle(showNewsTicker);
// //   }, [showNewsTicker, onNewsTickerToggle]);

// //   useEffect(() => {
// //     localStorage.setItem('showVideo', JSON.stringify(showVideo));
// //     onVideoToggle(showVideo);
// //   }, [showVideo, onVideoToggle]);

// //   useEffect(() => {
// //     localStorage.setItem('videoLink', videoLink);
// //     onUpdateVideoLink(videoLink);
// //   }, [videoLink, onUpdateVideoLink]);

// const handleCheckboxChange = (setter) => {
//     // Update the state and immediately send the update to the database
//     setter((prev) => {
//       const newValue = !prev;
//       updateSettings(newValue);
//       return newValue;
//     });
//   };


//   const updateSettings = async (newValue) => {
//     try {
//       // Update the settings in the database
//       const response = await fetch('http://localhost:8080/api/settings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           showNewsTicker: newValue ? 1 : 0, // Convert boolean to 1 or 0
//           showVideo: showVideo ? 1 : 0,
//           videoLink,
//         }),
//       });
//       const data = await response.json();
//       console.log('Updated settings:', data.success);
//     } catch (error) {
//       console.error('Error updating settings:', error);
//     }
//   };




// //   const handleVideoLinkChange = (event) => {
// //     setVideoLink(event.target.value);
// //   };

// //   const handleUpdateVideoLink = async () => {
// //     try {
// //       // Update the video link in the database
// //       const response = await fetch('http://localhost:8080/api/settings', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           videoLink,
// //           showNewsTicker,
// //           showVideo,
// //         }),
// //       });


  
// //   const handleVideoLinkChange = (event) => {
// //     setVideoLink(event.target.value);
// //   };

//   const handleUpdateVideoLink = async () => {
//     updateSettings(showNewsTicker);
//   };

//   return (
//     <div>
//       <div className='more-settings-main'>
//         <div>
//           <label>
//             Show/Hide NewsTicker
//             <input type="checkbox" checked={showNewsTicker} onChange={() => handleCheckboxChange(setShowNewsTicker)} />
//           </label>
//         </div>

//         <div>
//           <label>
//             Show/Hide Video
//             <input type="checkbox" checked={showVideo} onChange={() => handleCheckboxChange(setShowVideo)} />
//           </label>
//         </div>

//         <div>
//           <label>
//             Video Link:
//             <input type="text" defaultValue={videoLink} /> 
//            { /*onChange={handleVideoLinkChange}*/}
//             <button onClick={handleUpdateVideoLink}>Update Video Link</button>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MoreSettings;






























// import React, { useState, useEffect } from 'react';
// import './MoreSettings.css';

// function MoreSettings({ onNewsTickerToggle, onVideoToggle, onUpdateVideoLink }) {
//   const [showNewsTicker, setShowNewsTicker] = useState(() => {
//     const storedValue = localStorage.getItem('showNewsTicker');
//     return storedValue ? JSON.parse(storedValue) : true;
//   });

//   const [showVideo, setShowVideo] = useState(() => {
//     const storedValue = localStorage.getItem('showVideo');
//     return storedValue ? JSON.parse(storedValue) : true;
//   });

//   const [videoLink, setVideoLink] = useState(() => {
//     const storedValue = localStorage.getItem('videoLink');
//     return storedValue || ''; // Set default value to an empty string
//   });

//   useEffect(() => {
//     localStorage.setItem('showNewsTicker', JSON.stringify(showNewsTicker));
//     onNewsTickerToggle(showNewsTicker);
//   }, [showNewsTicker, onNewsTickerToggle]);

//   useEffect(() => {
//     localStorage.setItem('showVideo', JSON.stringify(showVideo));
//     onVideoToggle(showVideo);
//   }, [showVideo, onVideoToggle]);

//   useEffect(() => {
//     localStorage.setItem('videoLink', videoLink);
//     onUpdateVideoLink(videoLink);
//   }, [videoLink, onUpdateVideoLink]);

//   const handleCheckboxChange = (setter) => {
//     setter((prev) => !prev);
//   };

//   const handleVideoLinkChange = (event) => {
//     setVideoLink(event.target.value);
//   };

//   const handleUpdateVideoLink = (newVideoLink) => {
//     console.log('Updated video link:', newVideoLink);
//   };
  

//   return (
//     <div>
//       <div className='more-settings-main'>
//         <div>
//           <label>
//             Show/Hide NewsTicker
//             <input type="checkbox" checked={showNewsTicker} onChange={() => handleCheckboxChange(setShowNewsTicker)} />
//           </label>
//         </div>

//         <div>
//           <label>
//             Show/Hide Video
//             <input type="checkbox" checked={showVideo} onChange={() => handleCheckboxChange(setShowVideo)} />
//           </label>
//         </div>

//         <div>
//           <label>
//             Video Link:
//             <input type="text" value={videoLink} onChange={handleVideoLinkChange} />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MoreSettings;
