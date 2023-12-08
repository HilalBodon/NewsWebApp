import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import Navbar from '../../Components/NavBar/Nav';
import NewsTicker from '../../Components/NewsTicker/NewsTicker';
import PostList from '../../Components/PostsList/PostsLists';
import Footer from '../../Components/Footer/Footer';
import CategoryComponent from '../Category/CategoryComponent';
import PostComponent from '../Post/PostComponent';
// import Magazine from '../../Components/Magazine/Magazine';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [isPostComponentVisible, setPostComponentVisible] = useState(false);
  const [isHomePageVisible, setHomePageVisible] = useState(true);
  // const [isMagazineVisible, setMagazineVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/posts?sort=createdAt,important');
  //       const data = await response.json();
  //       setPosts(data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

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
  
    fetchPosts();
  }, [selectedCategory]); 
  

  const handleOverlayToggle = () => {
    setOverlayVisible(!isOverlayVisible);
  };


  const handleCategoryToggle = (category) => {
    setCategoryVisible(true);
    setPostComponentVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
    // setMagazineVisible(false);
  
  };


const handleCategoryClick = (category) => {
  // if (category === 'Magazine') {
  //   setMagazineVisible(true);
  //   setHomePageVisible(false);
  //   setCategoryVisible(false);
  //   setPostComponentVisible(false);
  //   setOverlayVisible(false);
  //   setSelectedCategory(null); 
  // } else {
    setSelectedCategory(category);
    setHomePageVisible(true);
    setCategoryVisible(false);
    setPostComponentVisible(false);
    setOverlayVisible(false);
    // setMagazineVisible(false);
  
};

  const handlePostComponentToggle = () => {
    setPostComponentVisible(true);
    setCategoryVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
    // setMagazineVisible(false);
  };

  const handleHomePageToggle = () => {
    setHomePageVisible(true);
    setPostComponentVisible(false);
    setCategoryVisible(false);
    setOverlayVisible(false);
    // setMagazineVisible(false);
  };

  return (
    <div>
      <Navbar
        onHomePageToggle={handleHomePageToggle}
        onCategoryToggle={handleCategoryToggle}
        onPostComponentToggle={handlePostComponentToggle}
        onCategoryClick={handleCategoryClick}
        />
      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible &&(
        <NewsTicker />
      )}

      {/* {isMagazineVisible && <Magazine />} */}


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
          <CategoryComponent />
        </div>
      )}

    {isPostComponentVisible && !isCategoryVisible && !isHomePageVisible &&(
      <PostComponent/>
    )}

      <Footer />
    </div>
  );
};

export default HomePage;
