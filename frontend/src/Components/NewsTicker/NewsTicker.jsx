import React, { useEffect, useState } from 'react';
import './NewsTicker.css';
import axios from 'axios';
import roayaLogo from "./roayaLogo.png";

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const NewsTicker = ({ featuredPosts }) => {
  const [importantPosts, setImportantPosts] = useState([]);

  return (
    <div className="news-ticker">
      <div className="news-container" id="news-container">
        {featuredPosts.map((post) => (
          <div className="news-item" key={post._id}>
            <img className="circle-img" src={roayaLogo} width={60} alt="Image" />
            <p key={post._id}>{post.Title}</p>
          </div>
        ))}
      </div>
      {/* <div className='live-word'>آخر المستجدات</div> */}
    </div>
  );
};

export default NewsTicker;


  // useEffect(() => {

  //   const fetchImportantPosts = async () => {
  //   try {
  //     let url = BaseURL + '/Posts';
  //     const response = await axios({
  //       url,
  //       method: 'get',
  //       params: {
  //         "fields": "Title",
  //         "order": "-createdAt",
  //         "where": {

  //           "featured": "1"
  //         },
  //       },
  //       headers: Headers,
  //     });
  //     const responseData = response.data;
  //     const postsData = responseData.results || [];
  //     setImportantPosts(postsData);
  
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // }
  //   fetchImportantPosts();
  // }, []);