import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {

  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};
const VideoSection = ({ className }) => {
  const [videoLink, setVideoLink] = useState('');

  const convertToEmbedLink = (youtubeUrl) => {
    const videoId = youtubeUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  useEffect(() => {
    const fetchVideoLink = async () => {
        try {
          const response = await axios({
            url: BaseURL + '/_Config',
            method: 'get',
            params: {
              "fields":"Value",
              "where":{"Parameter":"videoLink"}
            },
            headers: Headers
          });
        //  console.log("videolink from", response.data.results[0].Value)
         let videoLink = response.data.results[0].Value;

        setVideoLink(convertToEmbedLink(videoLink) || '');
      } catch (error) {
        console.error('Error fetching video link:', error);
      }
    };

    fetchVideoLink();
  }, []);

  return (
    <div className='video-section flex-1'>
      <div className={`video-container ${className}`}>
        <iframe className={`${className}`}
          src={videoLink}
          title="Playing Video From YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
