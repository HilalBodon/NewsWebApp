import React, { useEffect, useState } from 'react';
import './NewsTicker.css';
import roayaLogo from './roayaLogo.png';
import axios from 'axios';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const fetchFeaturedPosts = async () => {
  try {
    const url = `${BaseURL}/Posts`;
    const response = await axios.get(url, {
      params: {
        fields: '*',
        order: '-createdAt',
        media: 'images,files',
        crops: 'ax300,ax1000',
        limit: 100,
        where: {
          featured: 1,
        },
      },
      headers: Headers,
    });

    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

const NewsTicker = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      const postsData = await fetchFeaturedPosts();
      setFeaturedPosts(postsData);
    };

    loadFeaturedPosts();
  }, []);

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













// import React, { useEffect ,useState} from 'react';
// import './NewsTicker.css';
// import roayaLogo from './roayaLogo.png';
// import axios from 'axios';


// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const NewsTicker = () => {

//   const [featuredPosts, setFeaturedPosts] = useState([]);

//   useEffect(() => {

//     const fetchFeaturedPosts = async () => {
//       try {
//         let url = BaseURL + '/Posts';
//         const response = await axios({
//           url,
//           method: 'get',
//           params: {
//             "fields": "*",
//             "order": "-createdAt",
//             "media": "images,files",
//             "crops": "ax300,ax1000",
//             "limit": "100",
//             "where": {
//               "featured": "1"
//             },
//           },
//           headers: Headers,
//         });
//         const responseData = response.data;
//         const postsData = responseData.results || [];
//         setFeaturedPosts(postsData);

//       } catch (error) {
//         console.error('Error fetching featured posts:', error);
//       }
//     };

//     fetchFeaturedPosts();
//   })


//   return (
//     <div className="news-ticker">
//       <div className="ticker-wrap">
//         <div className="ticker-label hidden-sm">
//           آخر المستجدات
//         </div>
//         <div className="news-container">
//           {featuredPosts.map((post) => (
//             <div className="news-item" key={post._id}>
//               <img className="circle-img" src={roayaLogo} width={60} alt="Image" />
//               <p>{post.Title}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsTicker;








// .news-ticker {
//   /* width: 100%; */
//   /* margin: 0 auto; */
//   /* position: relative; */
//   /* overflow: hidden; */


//   display: block;
//   align-items: center;
//   justify-content: center;
//   background-color: white;
//   color: #1c3664;
//   margin: 2vw;
//   padding: 10px;
//   overflow: hidden;
//   white-space: nowrap;
//   box-shadow: inset 60px 0px 15px -15px rgba(216, 216, 216, 0.3);
//   font-size: 1.2rem ;
// }

// .ticker-wrap {
//   display: flex;
//   flex-direction: row;
//   background: #fcfcfc;
//   position: relative;
// }

// /* .ticker-label {
//   position: absolute;
//   right: 0;
//   z-index: 1;
//   padding: 10px;
//   color: white;
//   background-image: linear-gradient(45deg, red, #b71414);
//   border-radius: 5px;
// } */

// .news-container {
//   display: flex;
//   flex-direction: row;
//   animation: scrollNews linear infinite;
//   animation-duration: 0s; /* Adjust the duration as needed */
// }

// .news-item {
//   display: flex;
//   align-items: center;
//   padding: 0 20px; /* Adjust the padding as needed */
// }
//  .news-item p{
//   text-wrap: nowrap;
//  }

// @keyframes scrollNews {
//   from {
//     transform: translateX(100%);
//   }
//   to {
//     transform: translateX(-100%);
//   }
// }


// .circle-img {
//   border-radius: 50%;
//   padding: 0 10px 0 10px;
//   margin: 0 30px 0 15px;
// }


// .news-ticker {
//   /* width: 100%; */
//   /* padding-left: 15px; */
//   /* padding-right: 15px; */
//   /* margin: 2vh 0 2vh 0 ;
//   position: relative; */
//   float: none;
//   /* width: 100%; */
//   overflow: hidden;
// }

// .ticker-wrap {
//   display: flex;
//   flex-direction: row;
//   background: #ffffff;
//   /* position: relative; */
//   outline: none !important;

// }

// .ticker-label{
//   position: absolute;
//   right: 0;
//   z-index: 1;
//   padding: 10px;
//   /* height: 100%; */
//   color: white;
//   background-image: linear-gradient(45deg, red, #b71414);
//   margin-bottom: 0;
//   border-radius: 5px;
// }


// .news-container {
//   display: flex;
//   flex-direction: row;
//   height: 32px;
//   line-height: 32px;
//   white-space: nowrap;
//   box-sizing: content-box;
//   -webkit-animation-iteration-count: infinite;
//   animation-iteration-count: infinite;
//   -webkit-animation-timing-function: linear;
//   animation-timing-function: linear;
//   -webkit-animation-name: ticker;
//   animation-name: ticker;
//   -webkit-animation-duration: 20s !important;
//   animation-duration: 30s !important;
//   width: 100%;
//   height: 40px;
//   animation-play-state: running;
//   animation-delay: 1.5s;
//   animation: scrollNews linear infinite;
//   animation-direction: reverse;

// }

// @media (max-width: 900px) {
//   .ticker-label.hidden-sm {
//     display: none;
//   }
// }



