import React, { useEffect ,useState} from 'react';
import './NewsTicker.css';
import roayaLogo from './roayaLogo.png';
import axios from 'axios';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const NewsTicker = () => {

  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {

    const fetchFeaturedPosts = async () => {
      try {
        let url = BaseURL + '/Posts';
        const response = await axios({
          url,
          method: 'get',
          params: {
            "fields": "*",
            "order": "-createdAt",
            "media": "images,files",
            "crops": "ax300,ax1000",
            "limit": "100",
            "where": {
              "featured": "1"
            },
          },
          headers: Headers,
        });
        const responseData = response.data;
        const postsData = responseData.results || [];
        setFeaturedPosts(postsData);

      } catch (error) {
        console.error('Error fetching featured posts:', error);
      }
    };

    fetchFeaturedPosts();
  })


  return (
    <div className="news-ticker">
      <div className="ticker-wrap">
        <div className="ticker-label hidden-sm">
          آخر المستجدات
        </div>
        <div className="news-container">
          {featuredPosts.map((post) => (
            <div className="news-item" key={post._id}>
              <img className="circle-img" src={roayaLogo} width={60} alt="Image" />
              <p>{post.Title}</p>
            </div>
          ))}
        </div>
      </div>
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