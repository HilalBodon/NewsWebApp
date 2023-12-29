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
import MainSection from '../MainSection/MainSection';
import LoadingSpinner from '../LoadingSpinner';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};



const fetchPosts = async (selectedCategory, setPosts) => {
  try {
    let url = BaseURL + '/Posts';

    const response = await axios({
      url,
      method: 'get',
      params: {
        "fields": "*,categories",
        "order": "-createdAt",
        "media": "images,files",
        "crops": "ax300,ax1000",
        "limit": "100",
        "categories": selectedCategory === '1Rav71bqVy' ? null : selectedCategory,
      },
      headers: Headers,
    });

    const responseData = response.data;
    const postsData = responseData.results || [];
    setPosts(postsData);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
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
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isMainSectionVisible, setMainSectionVisibile] = useState(true);



  const fetchCategoriesData = async () => {
    try {
      const response = await axios({
        url: BaseURL + '/Posts/Categories',
        method: 'get',
        
        headers: Headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


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
    fetchPosts(selectedCategory, setPosts); 
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

        const settings = await response.data.results[0];

        setVideoLink(settings?.Value || '');
        // console.log(videoLink)
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
          params: {
            "fields": "Value",
            "where": {"Parameter": "showVideo"}
          },
          headers: Headers
        });
         const data = await response.data.results;
        // setShowNewsTicker(data.showNewsTicker);
        setShowVideo(data[0].Value);
        // setVideoLink(data.videoLink || '');
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
    setMainSectionVisibile(category === "1Rav71bqVy");
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

  // const handleNewsTickerToggle = (show) => {
  //   setShowNewsTicker(show);
  // };

  // const handleVideoToggle = (show) => {
  //   setShowVideo(show);
  // };


  return (
    <div className='homePage-style'>
      <Navbar
        onHomePageToggle={handleHomePageToggle}
        onCategoryToggle={handleCategoryToggle}
        onPostComponentToggle={handlePostComponentToggle}
        onCategoryClick={handleCategoryClick}
        updateCategories={handleUpdateSidebar}
        onSettingsToggle={handleSettingsToggle}
        fetchPosts={handleCategoryClick}
        />

      {/* {isLoading && (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      )} */}

    {isLoading && <LoadingSpinner />}

      {isHomePageVisible && isMainSectionVisible && !isCategoryVisible && !isPostComponentVisible &&(
          <>
          <NewsTicker featuredPosts={featuredPosts} />
          <MainSection featuredPosts={featuredPosts} showVideo={showVideo} />
          </>
          )}


      {/* {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible &&  showVideo === "1" && (
        <VideoSection />
      )} */}
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

      {/* {isSettingsVisible && !isHomePageVisible && !isPostComponentVisible && !isCategoryVisible && !isLoading && (
        <div className='moreSettings-mainStyle'>
          <MoreSettings
            onNewsTickerToggle={handleNewsTickerToggle}
            onVideoToggle={handleVideoToggle}
          />
        </div>
      )} */}

      <Footer />
    </div>
  );
};

export default HomePage;





  // useEffect(() => {
    // const fetchPosts = async () => {
    //   let limit = 10;
    //   let page = 1;
    //   axios({
    //     url: BaseURL + '/Posts',
    //     method: 'get',
    //     params: {
    //       "fields": "*,categories",
    //       "media": "images",
    //       "crops": "ax300",
    //       "order": "-objectId",
    //       "where": {
    //         // "featured": "1"
    //       },
    //       "limit": limit,
    //       "offset": (page-1) * limit
    //     },
    //     headers: Headers
    //  })
    //  .then(response => {
    //     console.log("NEWWWWW", response.data.results)
    //  }) 
    //  .catch(err => {
    //     console.log(err);
    //  });


// ________________________________________________


  // try {
  //   let url = BaseURL + '/Posts';

  //   const response = await axios({
  //     url,
  //     method: 'get',
  //     params: {
  //       "fields": "*,categories",
  //       "order": "-createdAt",
  //       "media": "images,files",
  //       "crops": "ax300,ax1000",
  //       "limit": "100",
  //       "categories": selectedCategory === '1Rav71bqVy' ? setSelectedCategory(null) : selectedCategory,
  //     },
  //     headers: Headers,
  //   });

  //   const responseData = response.data;
  //   const postsData = responseData.results || [];
  //   // console.log("second", selectedCategory, postsData);
  //   setPosts(postsData);
  // } catch (error) {
  //   console.error('Error fetching posts:', error);
  // }

// _______________________________________________



      // try {
      //   let url = BaseURL + '/Posts';
      //   // let limit = 10;
      //   //         if (selectedCategory) {
      //   //           url += `?categories=${selectedCategory}`;
      //   //           console.log(selectedCategory)
      //   // }
    
      //   const response = await axios({
      //     url,
      //     method: 'get',
      //     params: {
      //       "fields": "*,categories",
      //       "order": "-createdAt",
      //       "media": "images,files",
      //       "crops": "ax300,ax1000",
      //       // "limit": limit,
      //     },
      //     headers: Headers,
      //   });
      //   const responseData = response.data;
      //   // console.log(responseData)
      //   const postsData = responseData.results || [];
      //   setPosts(postsData);
      // } catch (error) {
      //   console.error('Error fetching posts:', error);
      // } 
    // };
    





  //   const fetchData = async () => {
  //     try {
  //       const updatedCategories = await fetchCategoriesData();
  //       setCategories(updatedCategories);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error updating categories:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  //   fetchPosts();
  // }, [selectedCategory, updateTrigger]);

