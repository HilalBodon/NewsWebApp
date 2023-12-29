import React from 'react';
import './NewsTicker.css';
import roayaLogo from './roayaLogo.png';

const NewsTicker = ({ featuredPosts }) => {
  return (
    <div className="news-ticker">
      <div className="ticker-wrap">
        <div className="ticker-label">آخر المستجدات</div>
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