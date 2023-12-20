import React, { useEffect, useState } from 'react';
import './NewsTicker.css';
import axios from 'axios';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const NewsTicker = () => {
  const [importantPosts, setImportantPosts] = useState([]);

  useEffect(() => {

    const fetchImportantPosts = async () => {
    try {
      let url = BaseURL + '/Posts';
      const response = await axios({
        url,
        method: 'get',
        params: {
          "fields": "Title",
          "order": "-createdAt",
          "where": {

            "featured": "1"
          },
        },
        headers: Headers,
      });
      const responseData = response.data;
      const postsData = responseData.results || [];
      setImportantPosts(postsData);
  
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
    fetchImportantPosts();
  }, []);




  return (

    <div className="news-ticker">
      <div className="news-container" id="news-container">
        {importantPosts.map((post) => (
          <div className="news-item" key={post._id}>
          <img className="circle-img" src="https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703103247s964e02c3e85(40xa).png" alt="Image" />
          <p>{post.Title}</p>  
          <img className="circle-img" src="https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703103247s964e02c3e85(40xa).png" alt="Image" />
        </div>
        ))}
      </div>
        <p className='live-word'>آخر المستجدات</p>
    </div>
  );
};

export default NewsTicker;

