
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
  const [showNewsTicker, setShowNewsTicker] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const convertToEmbedLink = (youtubeUrl) => {
    const videoId = youtubeUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

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

    const fetchData = async () => {
      try {
        const updatedCategories = await fetchCategoriesData();
        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error updating categories:', error);
      }
    };

    fetchData();

    fetchPosts();
  }, [selectedCategory, updateTrigger]); 

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


  const handleUpdateVideoLink = (newVideoLink) => {
    const embedLink = convertToEmbedLink(newVideoLink);
    console.log('Updated video link:', embedLink);
    setVideoLink(embedLink || '');
    setShowVideo(!!embedLink);
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

      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showNewsTicker && (
        <NewsTicker />
      )}


{isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && showVideo && (
        <VideoSection initialVideoLink={videoLink} videoLink={videoLink} />
        )}
      <hr />
  
      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && !isSettingsVisible &&(
        <div>
          <div className='cards-div'>
            <PostList posts={posts} selectedCategory={selectedCategory} onCardClick={handleOverlayToggle} />
          </div>
        </div>
      )}

      {isCategoryVisible && !isHomePageVisible && !isPostComponentVisible && !isSettingsVisible &&(
        <div>
          <CategoryComponent updateCategories={handleUpdateSidebar} />
        </div>
      )}

      {isPostComponentVisible && !isCategoryVisible && !isHomePageVisible && !isSettingsVisible &&(
        <PostComponent updatePosts={handleUpdateTrigger} />
      )}

      {isSettingsVisible && !isHomePageVisible && !isPostComponentVisible && !isCategoryVisible &&(
        <div>
          <MoreSettings onNewsTickerToggle={handleNewsTickerToggle} onVideoToggle={handleVideoToggle} onUpdateVideoLink={handleUpdateVideoLink} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;

