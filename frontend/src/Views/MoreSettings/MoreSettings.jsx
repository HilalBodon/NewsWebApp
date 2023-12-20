import React, { useState, useEffect } from 'react';
import './MoreSettings.css';
import axios from 'axios';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

function MoreSettings({ onNewsTickerToggle, onVideoToggle, onUpdateVideoLink }) {
  const [showNewsTicker, setShowNewsTicker] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('');

    useEffect(() => {

      const fetchSettings = async () => {
        try {
          const response = await axios({
            url: BaseURL + '/_Config',
            method: 'get',
            headers: Headers,
            params: {
              "fields":"*"
            }
          });
           const data = await response.data;
  
          setShowNewsTicker(data.showNewsTicker);
          setShowVideo(data.showVideo);
          setVideoLink(data.videoLink || '');
          console.log("data",data.results)
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      };

      fetchSettings();
    }, []);



  const handleCheckboxChange = (setter) => {
    setter((prev) => {
      const newValue = !prev;
      updateSettings(newValue, setter);

      if (setter === setShowNewsTicker) {
        onNewsTickerToggle(newValue);
      } else if (setter === setShowVideo) {
        onVideoToggle(newValue);
      }
      console.log(newValue);
      return newValue;
    });
  };




  // const updateSettings = async (newValue, setter) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/settings', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         showNewsTicker: setter === setShowNewsTicker ? newValue : showNewsTicker ? 1 : 0,
  //         showVideo: setter === setShowVideo ? newValue ? 1 : 0 : showVideo ? 1 : 0,
  //         videoLink,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log('Updated settings:', data.success);
  //   } catch (error) {
  //     console.error('Error updating settings:', error);
  //   }
  // };



  const updateSettings = async (newValue, setter, showNewsTicker, showVideo, videoLink) => {
    try {
      const response = await axios({
        url: BaseURL + '/_Config',
        method: 'POST',
        headers: Headers,
        data: {
          showNewsTicker: setter === setShowNewsTicker ? newValue : showNewsTicker ? 1 : 0,
          showVideo: setter === setShowVideo ? newValue ? 1 : 0 : showVideo ? 1 : 0,
          videoLink,
        },
      });
  
      const data = response.data;
      console.log('Updated settings:', data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };



  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
  };

  const handleUpdateVideoLink = async () => {
    updateSettings(showNewsTicker);
    console.log('link updated successfully');
  };

  return (
    <div className='more-settings-main'>
      <div className='label-container'>
        <div className='checkbox-label'>
          <label>
            Show/Hide NewsTicker
            <input type='checkbox' checked={showNewsTicker} onChange={() => handleCheckboxChange(setShowNewsTicker)} />
          </label>
        </div>

        <div className='checkbox-label'>
          <label>
            Show/Hide Video
            <input type='checkbox' checked={showVideo} onChange={() => handleCheckboxChange(setShowVideo)} />
          </label>
        </div>
      </div>

      <div className='input-label'>
        <label>
          Video Link:
          <input type='text' value={videoLink} onChange={handleVideoLinkChange} />
        </label>
      </div>

      <div className='button-container'>
        <button className='button-container-button' onClick={handleUpdateVideoLink}>Update Video Link</button>
      </div>
    </div>
  );
}

export default MoreSettings;











// import React, { useState, useEffect } from 'react';
// import './MoreSettings.css';

// function MoreSettings({ onNewsTickerToggle, onVideoToggle, onUpdateVideoLink }) {
//   const [showNewsTicker, setShowNewsTicker] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [videoLink, setVideoLink] = useState('');

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/settings');
//         const data = await response.json();
//         setShowNewsTicker(data.showNewsTicker);
//         setShowVideo(data.showVideo);
//         setVideoLink(data.videoLink || '');
//       } catch (error) {
//         console.error('Error fetching settings:', error);
//       }
//     };

//     fetchSettings();
//   }, []);

// const handleCheckboxChange = (setter) => {
//     setter((prev) => {
//       const newValue = !prev;
//       updateSettings(newValue, setter);
  
//       if (setter === setShowNewsTicker) {
//         onNewsTickerToggle(newValue);
//       } else if (setter === setShowVideo) {
//         onVideoToggle(newValue);
//       }
//       return newValue;
//     });
//   };
  
  
//   const updateSettings = async (newValue, setter) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/settings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           showNewsTicker: setter === setShowNewsTicker ? newValue : showNewsTicker ? 1 : 0,
//           showVideo: setter === setShowVideo ? newValue ? 1 : 0 : showVideo ? 1 : 0,
//           videoLink,
//         }),
//       });
//       const data = await response.json();
//       console.log('Updated settings:', data.success);
//     } catch (error) {
//       console.error('Error updating settings:', error);
//     }
//   };
  
  

//   const handleVideoLinkChange = (event) => {
//     setVideoLink(event.target.value);
//   };

//   const handleUpdateVideoLink = async () => {
//     updateSettings(showNewsTicker);
//     console.log("link updated successfully")
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
//             <input type="text" value={videoLink} onChange={handleVideoLinkChange}/> 
//             {/*  */}
//             <button onClick={handleUpdateVideoLink}>Update Video Link</button>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MoreSettings;