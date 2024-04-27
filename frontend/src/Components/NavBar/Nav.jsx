import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import logoimg from "./logoimg.png";
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};


const Navbar = ({ onHomePageToggle, onPostComponentToggle, onCategoryToggle, onSettingsToggle, onCategoryClick, updateCategories, fetchPosts,showCategories = true  }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth > 1100);
  const [forceRender, setForceRender] = useState(false);
  const isValidToken = localStorage.getItem('token') !== null;
  const [categories, setCategories] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


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
      setIsScreenLarge(window.innerWidth > 1100);
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
        <MenuIcon style={{ fontSize: '4.5vh'}}/>
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
          <li key={category.objectId} onClick={() => handleCategoryClick(category)}>
            {category.Name}
          </li>
        ))}
          </ul>
        </div>
              )}

{!showCategories &&(
        <div>
          <Link to="/">
            <button className='back-button' > الرئيسية</button>
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
