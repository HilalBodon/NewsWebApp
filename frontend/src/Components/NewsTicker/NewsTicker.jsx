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

  // useEffect(() => {
  //   const fetchImportantPosts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/important-posts');
  //       const data = await response.json();
  //       setImportantPosts(data);
  //       console.log("NEWWWWWsiii", data);

  //     } catch (error) {
  //       console.error('Error fetching important posts:', error);
  //     }
  //   };

  //   fetchImportantPosts();
  // }, []);

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
          // "limit": limit,
        },
        headers: Headers,
      });
      console.log("NEWWWWWsiii", response.data.results);

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
            | {post.Title} |
          </div>
        ))}
      </div>
        <p className='live-word'>آخر المستجدات</p>
    </div>
  );
};

export default NewsTicker;

