// import React, { useState } from 'react';

// const VideoSection = ({ initialVideoLink }) => {
//   const [videoLink, setVideoLink] = useState(initialVideoLink || '');

//   const handleVideoLinkChange = (event) => {
//     setVideoLink(event.target.value);
//   };

//   const handleUpdateVideoLink = () => {
//     // Perform any additional logic or validation if needed
//     // For simplicity, you can directly set the video link in the state here
//     setVideoLink(videoLink);
//   };

//   return (
//     <div className="video-section">
//       <div className="video-container">
//         <iframe
//           src={videoLink}
//           title="Playing Video From YouTube"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div>
//         <label>
//           Video Link:
//           <input type="text" value={videoLink} onChange={handleVideoLinkChange} />
//         </label>
//         <button onClick={handleUpdateVideoLink}>Update Video Link</button>
//       </div>
//     </div>
//   );
// };

// export default VideoSection;


import React, { useState,useEffect } from 'react';

const VideoSection = ({ initialVideoLink ,showVideo, videoLink }) => {
  
  const [localVideoLink, setLocalVideoLink] = useState(initialVideoLink || '');
  
  useEffect(() => {
    console.log("videooooo",videoLink)
    setLocalVideoLink(videoLink);
  }, [videoLink]);


  return (
    <div className="video-section">
      <div className="video-container">
        <iframe
          src={localVideoLink}
          title="Playing Video From YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
