import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import Navbar from '../../Components/NavBar/Nav';
import NewsTicker from '../../Components/NewsTicker/NewsTicker';
import PostList from '../../Components/PostsList/PostsLists';
import Footer from '../../Components/Footer/Footer';
import CategoryComponent from '../Category/CategoryComponent';
import PostComponent from '../Post/PostComponent';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [isPostComponentVisible, setPostComponentVisible] = useState(false);
  const [isHomePageVisible, setHomePageVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [categories, setCategories] = useState([]); // Added this line

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
  
  };


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
};

  const handlePostComponentToggle = () => {
    setPostComponentVisible(true);
    setCategoryVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
  };

  const handleHomePageToggle = () => {
    setHomePageVisible(true);
    setPostComponentVisible(false);
    setCategoryVisible(false);
    setOverlayVisible(false);
  };

  return (
    <div className='homePage-style'>
      <Navbar
        onHomePageToggle={handleHomePageToggle}
        onCategoryToggle={handleCategoryToggle}
        onPostComponentToggle={handlePostComponentToggle}
        onCategoryClick={handleCategoryClick}
        updateCategories={handleUpdateSidebar} 
        />
      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible &&(
        <NewsTicker />
      )}

      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible &&(
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/bNyUyrR0PHo"
            title="Playing Video From YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <hr />
  
    {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && (
        <div>
          <div className='cards-div'>
            <PostList posts={posts} selectedCategory={selectedCategory} onCardClick={handleOverlayToggle} />
          </div>
        </div>
      )}

      {isCategoryVisible && !isHomePageVisible && !isPostComponentVisible && (
        <div>
      <CategoryComponent updateCategories={handleUpdateSidebar} />
        </div>
      )}

    {isPostComponentVisible && !isCategoryVisible && !isHomePageVisible &&(
        <PostComponent updatePosts={handleUpdateTrigger} />
        )}

      <Footer />
    </div>
  );
};

export default HomePage;
