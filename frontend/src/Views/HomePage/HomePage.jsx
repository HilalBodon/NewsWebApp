
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

const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [isPostComponentVisible, setPostComponentVisible] = useState(false);
  const [isHomePageVisible, setHomePageVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSettingsVisible , setSettingsVisible]= useState(false);
  const [showNewsTicker, setShowNewsTicker] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setLoading] = useState(true);


  const fetchCategoriesData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = 'http://localhost:8080/api/posts?sort=createdAt,important';

        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

  //   const fetchData = async () => {
  //     try {
  //       const updatedCategories = await fetchCategoriesData();
  //       setCategories(updatedCategories);
  //     } catch (error) {
  //       console.error('Error updating categories:', error);
  //     }
  //   };

  //   fetchData();

  //   fetchPosts();
  // }, [selectedCategory, updateTrigger]); 


  
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
        // fetchVideoLink();
      }, [selectedCategory, updateTrigger]);

  
  useEffect(() => {
   const fetchVideoLink = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/settings');
        const settings = await response.json();
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
      const response = await fetch('http://localhost:8080/api/settings');
      const data = await response.json();

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


      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showNewsTicker && (
        <NewsTicker />
      )}


      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showVideo && (
        <VideoSection/>
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
