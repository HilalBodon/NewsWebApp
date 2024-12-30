import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import Navbar from '../../Components/NavBar/Nav';
import NewsTicker from '../../Components/NewsTicker/NewsTicker';
import PostList from '../../Components/PostsList/PostsLists';
import Footer from '../../Components/Footer/Footer';
import axios from "axios";
import MainSection from '../MainSection/MainSection';
import LoadingSpinner from '../LoadingSpinner';
import Img from "../../Components/PostsList/default-Img.png";

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
        "limit": "10000",
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
  // const [showNewsTicker, setShowNewsTicker] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isMainSectionVisible, setMainSectionVisibile] = useState(true);
  const [adImage, setadImage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [adLink, setAdLink] = useState('');


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
    const fetchData = async () => {
      try {
        const updatedCategories = await fetchCategoriesData();
        setCategories(updatedCategories);
        setLoading(false);
  
        fetchPosts(selectedCategory, setPosts);

        const videoLinkResponse = await axios({
          url: BaseURL + '/_Config',
          method: 'get',
          params: {
            "fields": "Value",
            "where": {"Parameter": "videoLink"}
          },
          headers: Headers
        });
        const videoLinkSettings = videoLinkResponse.data.results[0];
        setVideoLink(videoLinkSettings?.Value || '');
  

        const settingsResponse = await axios({
          url: BaseURL + '/_Config',
          method: 'get',
          params: {
            "fields": "Value",
            "where": {"Parameter": "showVideo"}
          },
          headers: Headers
        });
        const settingsData = settingsResponse.data.results;
        setShowVideo(settingsData[0]?.Value);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedCategory, updateTrigger]);  
  



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





  useEffect(() => {
    const fetchAdImg = async () => {
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
            "limit": "10000",
            "categories": selectedCategory === '1Rav71bqVy' ? null : selectedCategory,
          },
          headers: Headers,
        });
  
        const responseData = response.data;
        const adImg = responseData.results || [];
  
        const filteredPosts = adImg.filter(post => post.categories.some(category => category.objectId === '1Rav71bqVy'));
        const AdImgUrl = filteredPosts.length > 0 ? filteredPosts[0].images?.untitled[0]?.dir + filteredPosts[0].images?.untitled[0]?.imageax300 : null;
        setadImage(AdImgUrl || "");

        setAdLink(filteredPosts[0].imgUrl || "");
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchAdImg();
  }, [selectedCategory]);
  

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAdClick = () => {
    window.location.href = adLink;
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
  // 1Rav71bqVy
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


  return (
    <div className='homePage-style'>
      <Navbar
        onHomePageToggle={handleHomePageToggle}
        // onCategoryToggle={handleCategoryToggle} 
        onPostComponentToggle={handlePostComponentToggle}
        onCategoryClick={handleCategoryClick}
        updateCategories={handleUpdateSidebar}
        onSettingsToggle={handleSettingsToggle}
        fetchPosts={handleCategoryClick}
        />

    {isLoading && <LoadingSpinner />}

      {isHomePageVisible && isMainSectionVisible && !isCategoryVisible && !isPostComponentVisible &&(
          <>
          <NewsTicker />
          <MainSection showVideo={showVideo} />
          </>
          )}

    <div className="ad-image flex justify-center w-full">
      {adImage && (
        <img src={adImage} alt="AdIMG" onLoad={handleImageLoad} onClick={handleAdClick} />
      )}

    </div>



      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && !isSettingsVisible && !isLoading && (
        <div>
          <div className='cards-div'>
            <PostList posts={posts} selectedCategory={selectedCategory} onCardClick={handleOverlayToggle} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
