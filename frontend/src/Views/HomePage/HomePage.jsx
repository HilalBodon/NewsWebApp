
// import React, { useState, useEffect } from 'react';
// import "./HomePage.css";
// import Navbar from '../../Components/NavBar/Nav';
// import NewsTicker from '../../Components/NewsTicker/NewsTicker';
// import PostList from '../../Components/PostsList/PostsLists';
// import Footer from '../../Components/Footer/Footer';
// import CategoryComponent from '../Category/CategoryComponent';
// import PostComponent from '../Post/PostComponent';
// import MoreSettings from '../MoreSettings/MoreSettings';
// import VideoSection from '../VideoSection/VideoSection';
// import axios from "axios";


// const BaseURL = 'https://www.beaapis.com/1';
// const Headers = {
//   'X-BEA-Application-Id': 'Fdo32NoHF7H3ur5tzT0zp7S_QMOnW6zhEVab3U37zEk',
//   'X-BEA-Authorization': 'mDbKLYBJOOqxVlZuW4ov6Vk_66EeqILi3qG7-hOipM0',
// };


// const HomePage = () => {

//   const [posts, setPosts] = useState([]);
//   const [isOverlayVisible, setOverlayVisible] = useState(false);
//   const [isCategoryVisible, setCategoryVisible] = useState(false);
//   const [isPostComponentVisible, setPostComponentVisible] = useState(false);
//   const [isHomePageVisible, setHomePageVisible] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [updateTrigger, setUpdateTrigger] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isSettingsVisible, setSettingsVisible] = useState(false);
//   const [showNewsTicker, setShowNewsTicker] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [videoLink, setVideoLink] = useState('');
//   const [isLoading, setLoading] = useState(true);


//   const fetchCategoriesData = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/categories');
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };


//   useEffect(() => {
//     const fetchPosts = async () => {

//       let limit = 10;
//       let page = 1;
//       axios({
//         url: BaseURL + '/Posts',
//         method: 'get',
//         params: {
//           "fields": "*",
//           "order": "-objectId",
//           "where": {
//             // "featured": "1"
//           },
//           "limit": limit,
//           "offset": (page-1) * limit
//         },
//         headers: Headers
//      })
//      .then(response => {
//         console.log("NEWWWWW", response.data.results)
//      }) 
//      .catch(err => {
//         console.log(err);
//      });


//       // fetch(BaseURL + '/Posts/' + stringify() 
//       // // new URLSearchParams({
//       // //   "fields": "*",
//       // //   "order": "-objectId",
//       // //   "where": {
//       // //     "featured": 1,
//       // //     "Title": "N2"
//       // //   },
//       // //   "limit": limit,
//       // //   "offset": (page-1) * limit
//       // // }).toString()
//       // , {
//       //   method: 'GET',
//       //   headers: Headers,
//       // })
//       //   .then(response => response.json())
//       //   .then(response => console.log("NEW", response))
//       //   .catch(err => console.error(err));

//       try {
//         let url = 'http://localhost:8080/api/posts?sort=createdAt,important';

//         if (selectedCategory) {
//           url += `&category=${selectedCategory}`;
//         }

//         const response = await fetch(url);
//         const data = await response.json();

//         console.log("OLD", data);

//         setPosts(data);

//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     //   const fetchData = async () => {
//     //     try {
//     //       const updatedCategories = await fetchCategoriesData();
//     //       setCategories(updatedCategories);
//     //     } catch (error) {
//     //       console.error('Error updating categories:', error);
//     //     }
//     //   };

//     //   fetchData();

//     //   fetchPosts();
//     // }, [selectedCategory, updateTrigger]); 



//     const fetchData = async () => {
//       try {
//         const updatedCategories = await fetchCategoriesData();
//         setCategories(updatedCategories);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error updating categories:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//     fetchPosts();
//     // fetchVideoLink();
//   }, [selectedCategory, updateTrigger]);


//   useEffect(() => {
//     const fetchVideoLink = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/settings');
//         const settings = await response.json();
//         setVideoLink(settings.videoLink || '');
//       } catch (error) {
//         console.error('Error fetching video link:', error);
//       }
//     };

//     fetchVideoLink();
//   }, []);


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



//   const handleUpdateTrigger = () => {
//     setUpdateTrigger((prev) => !prev);
//     console.log('Posts updated in HomePage!');
//   };

//   const handleOverlayToggle = () => {
//     setOverlayVisible(!isOverlayVisible);
//   };


//   const handleCategoryToggle = (category) => {
//     setCategoryVisible(true);
//     setPostComponentVisible(false);
//     setHomePageVisible(false);
//     setOverlayVisible(false);
//     setSettingsVisible(false);
//   };

//   const handleSettingsToggle = () => {
//     setSettingsVisible(true);
//     setCategoryVisible(false);
//     setPostComponentVisible(false);
//     setHomePageVisible(false);
//     setOverlayVisible(false);
//   }

//   const handleUpdateSidebar = async () => {
//     try {
//       const updatedCategories = await fetchCategoriesData();
//       setCategories(updatedCategories);
//     } catch (error) {
//       console.error('Error updating sidebar:', error);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setHomePageVisible(true);
//     setCategoryVisible(false);
//     setPostComponentVisible(false);
//     setOverlayVisible(false);
//     setSettingsVisible(false);
//   };

//   const handlePostComponentToggle = () => {
//     setPostComponentVisible(true);
//     setCategoryVisible(false);
//     setHomePageVisible(false);
//     setOverlayVisible(false);
//     setSettingsVisible(false);
//   };

//   const handleHomePageToggle = () => {
//     setHomePageVisible(true);
//     setPostComponentVisible(false);
//     setCategoryVisible(false);
//     setOverlayVisible(false);
//     setSettingsVisible(false);
//   };

//   const handleNewsTickerToggle = (show) => {
//     setShowNewsTicker(show);
//   };

//   const handleVideoToggle = (show) => {
//     setShowVideo(show);
//   };

//   return (
//     <div className='homePage-style'>
//       <Navbar
//         onHomePageToggle={handleHomePageToggle}
//         onCategoryToggle={handleCategoryToggle}
//         onPostComponentToggle={handlePostComponentToggle}
//         onCategoryClick={handleCategoryClick}
//         updateCategories={handleUpdateSidebar}
//         onSettingsToggle={handleSettingsToggle}
//       />

//       {isLoading && (
//         <div className="loading-container">
//           <div className="loading-circle"></div>
//         </div>
//       )}


//       {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showNewsTicker && (
//         <NewsTicker />
//       )}


//       {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showVideo && (
//         <VideoSection />
//       )}
//       <hr />

//       {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && !isSettingsVisible && !isLoading && (
//         <div>
//           <div className='cards-div'>
//             <PostList posts={posts} selectedCategory={selectedCategory} onCardClick={handleOverlayToggle} />
//           </div>
//         </div>
//       )}

//       {isCategoryVisible && !isHomePageVisible && !isPostComponentVisible && !isSettingsVisible && !isLoading && (
//         <div>
//           <CategoryComponent updateCategories={handleUpdateSidebar} />
//         </div>
//       )}

//       {isPostComponentVisible && !isCategoryVisible && !isHomePageVisible && !isSettingsVisible && !isLoading && (
//         <PostComponent updatePosts={handleUpdateTrigger} />
//       )}

//       {isSettingsVisible && !isHomePageVisible && !isPostComponentVisible && !isCategoryVisible && !isLoading && (
//         <div className='moreSettings-mainStyle'>
//           <MoreSettings
//             onNewsTickerToggle={handleNewsTickerToggle}
//             onVideoToggle={handleVideoToggle}
//           />
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default HomePage;












import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import Navbar from '../../Components/NavBar/Nav';
import NewsTicker from '../../Components/NewsTicker/NewsTicker';
import PostList from '../../Components/PostsList/PostsLists';
import Footer from '../../Components/Footer/Footer';
import CategoryComponent from '../Category/CategoryComponent';
import PostComponent from '../Post/PostComponent';
import MoreSettings from '../MoreSettings/MoreSettings';
import VideoSection from '../VideoSection/VideoSection';
import axios from "axios";


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};


const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [isPostComponentVisible, setPostComponentVisible] = useState(false);
  const [isHomePageVisible, setHomePageVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [showNewsTicker, setShowNewsTicker] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setLoading] = useState(true);



  const fetchCategoriesData = async () => {
    try {
      const response = await axios({
        url: BaseURL + '/Posts/Categories',
        method: 'get',
        headers: Headers
      });
      //  console.log("hilal", response.data.results)

  
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

  useEffect(() => {

    const fetchPosts = async () => {

      let limit = 10;
      let page = 1;
      axios({
        url: BaseURL + '/Posts',
        method: 'get',
        params: {
          "fields": "*,categories",
          "media": "images",
          "crops": "ax300",
          "order": "-objectId",
          "where": {
            // "featured": "1"
          },
          "limit": limit,
          "offset": (page-1) * limit
        },
        headers: Headers
     })
     .then(response => {
        // console.log("NEWWWWW", response.data.results)
     }) 
     .catch(err => {
        console.log(err);
     });


    //   try {
    //     let url = 'http://localhost:8080/api/posts?sort=createdAt,important';

    //     if (selectedCategory) {
    //       url += `&category=${selectedCategory}`;
    //     }

    //     const response = await fetch(url);
    //     const data = await response.json();

    //     console.log("OLD", data);

    //     setPosts(data);
    //           } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // }


      try {
        let url = BaseURL + '/Posts';
        // let limit = 10;
                if (selectedCategory) {
          url += `&Categories=${selectedCategory}`;
        }
    
        const response = await axios({
          url,
          method: 'get',
          params: {
            "fields": "*,categories",
            "order": "-createdAt",
            "media": "images,files",
            "crops": "ax300,ax1000",
            "where": {
              // "featured": "1"
            },
            // "limit": limit,
          },
          headers: Headers,
        });
        const responseData = response.data;
        const postsData = responseData.results || [];
        setPosts(postsData);
        // console.log("NEWWWWWsiii", postsData);
    
      } catch (error) {
        console.error('Error fetching posts:', error);
      } 
    };
    





    const fetchData = async () => {
      try {
        const updatedCategories = await fetchCategoriesData();
        setCategories(updatedCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error updating categories:', error);
        setLoading(false);
      }
    };

    fetchData();
    fetchPosts();
  }, [selectedCategory, updateTrigger]);




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
         console.log("videolink", response.data)

        const settings = await response.data;
        setVideoLink(settings.videoLink || '');
      } catch (error) {
        console.error('Error fetching video link:', error);
      }
    };

    fetchVideoLink();
  }, []);




  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/_Config',
          method: 'get',
          headers: Headers
        });
         const data = await response.data;

        setShowNewsTicker(data.showNewsTicker);
        setShowVideo(data.showVideo);
        setVideoLink(data.videoLink || '');
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);



  const handleUpdateTrigger = () => {
    setUpdateTrigger((prev) => !prev);
    console.log('Posts updated in HomePage!');
  };

  const handleOverlayToggle = () => {
    setOverlayVisible(!isOverlayVisible);
  };


  const handleCategoryToggle = (category) => {
    setCategoryVisible(true);
    setPostComponentVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
    setSettingsVisible(false);
  };

  const handleSettingsToggle = () => {
    setSettingsVisible(true);
    setCategoryVisible(false);
    setPostComponentVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
  }

  const handleUpdateSidebar = async () => {
    try {
      const updatedCategories = await fetchCategoriesData();
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error updating sidebar:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setHomePageVisible(true);
    setCategoryVisible(false);
    setPostComponentVisible(false);
    setOverlayVisible(false);
    setSettingsVisible(false);
  };

  const handlePostComponentToggle = () => {
    setPostComponentVisible(true);
    setCategoryVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
    setSettingsVisible(false);
  };

  const handleHomePageToggle = () => {
    setHomePageVisible(true);
    setPostComponentVisible(false);
    setCategoryVisible(false);
    setOverlayVisible(false);
    setSettingsVisible(false);
  };

  const handleNewsTickerToggle = (show) => {
    setShowNewsTicker(show);
  };

  const handleVideoToggle = (show) => {
    setShowVideo(show);
  };

  return (
    <div className='homePage-style'>
      <Navbar
        onHomePageToggle={handleHomePageToggle}
        onCategoryToggle={handleCategoryToggle}
        onPostComponentToggle={handlePostComponentToggle}
        onCategoryClick={handleCategoryClick}
        updateCategories={handleUpdateSidebar}
        onSettingsToggle={handleSettingsToggle}
      />

      {isLoading && (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      )}


      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible &&(
        <NewsTicker />
      )}


      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showVideo && (
        <VideoSection />
      )}
      <hr />

      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && !isSettingsVisible && !isLoading && (
        <div>
          <div className='cards-div'>
            <PostList posts={posts} selectedCategory={selectedCategory} onCardClick={handleOverlayToggle} />
          </div>
        </div>
      )}

      {isCategoryVisible && !isHomePageVisible && !isPostComponentVisible && !isSettingsVisible && !isLoading && (
        <div>
          <CategoryComponent updateCategories={handleUpdateSidebar} />
        </div>
      )}

      {isPostComponentVisible && !isCategoryVisible && !isHomePageVisible && !isSettingsVisible && !isLoading && (
        <PostComponent updatePosts={handleUpdateTrigger} />
      )}

      {isSettingsVisible && !isHomePageVisible && !isPostComponentVisible && !isCategoryVisible && !isLoading && (
        <div className='moreSettings-mainStyle'>
          <MoreSettings
            onNewsTickerToggle={handleNewsTickerToggle}
            onVideoToggle={handleVideoToggle}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
