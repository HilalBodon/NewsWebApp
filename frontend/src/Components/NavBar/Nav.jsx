import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import logoimg from "./logoimg.png";
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};


const Navbar = ({ onHomePageToggle, onPostComponentToggle, onCategoryToggle, onSettingsToggle, onCategoryClick, updateCategories, fetchPosts,showCategories = true  }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth > 770);
  const [forceRender, setForceRender] = useState(false);
  const isValidToken = localStorage.getItem('token') !== null;
  const [categories, setCategories] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // const handleCategoryToggle = (category) => {
  //   console.log('Category toggled:', category);
  // };

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
    fetchPosts(category.objectId)
  
  };


  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Posts/Categories',
          method: 'get',
          params:{
          "order": "",
          "fields": "Name",
        },
        headers: Headers,

        });
        setCategories(response.data.results);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategoriesData();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth > 770);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useEffect(() => {
    setForceRender(false);
  }, [forceRender]);



  return (
    <nav className="navbar">
      {!isScreenLarge && (
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon style={{ fontSize: '2.5rem'}}/>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}
        onCategoryClick={handleCategoryClick} updateCategories={updateCategories}
        onHomePageToggle={onHomePageToggle} onCategoryToggle={onCategoryToggle}
         onPostComponentToggle={onPostComponentToggle} onSettingsToggle={onSettingsToggle}
         isValidToken={isValidToken}
         showCategories={showCategories}
         />
      </div>
           )}

{showCategories && isScreenLarge && (
        <div className='wrap-ul'>
          <ul className='list-styling'>
            {categories.map((category) => (
              <li key={category._id} onClick={() => handleCategoryClick(category)}>
                {category.Name}
              </li>
            ))}
          </ul>
        </div>
              )}

{!showCategories && isScreenLarge &&(
        <div>
          <Link to="/">
            <button className='back-button' >العودة الى الرئيسية</button>
          </Link>
        </div>
      )}

        <div className='roaya-letter-logo'>
        <div className='fading-text'>زاوية رؤية </div>
        <div className="logo">
        <img src={logoimg} alt="Logo" />
      </div>
      </div>
    </nav>
  );
};

export default Navbar;




  // const fetchPostsByCategory = async (category) => {
  //   try {
  //     const response = await axios({
  //       url: BaseURL + '/Posts',
  //       method: 'get',
  //       params: {
  //         fields: "*,categories",
  //         order: "-createdAt",
  //         media: "images,files",
  //         crops: "ax300,ax1000",
  //         limit: "100",
  //         categories: category === '1Rav71bqVy' ? null : category,
  //       },
  //       headers: Headers,
  //     });

  //     const responseData = response.data;
  //     const postsData = responseData.results || [];
  //     // Update the parent component with the new posts
  //     updateCategories(postsData);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   setForceRender(true);
  // };



  {/* 
      {isScreenLarge && isValidToken && (
        <ul className="nav-list">
          <li className="nav-item" onClick={onHomePageToggle}>Home</li>
          <li className="nav-item" onClick={onPostComponentToggle}>Manage Posts</li>
          <li className="nav-item" onClick={onCategoryToggle}>Manage Categories</li>
          <li className="nav-item" onClick={onSettingsToggle}>More Settings</li>
        </ul>
      )} */}

      {/* {isValidToken && (
        <div className="logout-btn" onClick={handleLogout}>
          Logout
        </div>
      )} */}