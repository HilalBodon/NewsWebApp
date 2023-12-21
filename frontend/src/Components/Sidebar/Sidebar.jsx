import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import axios from 'axios';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Sidebar = ({ isOpen, onClose, onCategoryClick, updateCategories, onHomePageToggle, onPostComponentToggle, onCategoryToggle, onSettingsToggle, isValidToken }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Posts/Categories',
          method: 'get',
          params:{
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
  

  const handleOverlayClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryClick(category.objectId);
    console.log(category.objectId)
  };

  return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='roaya-name'>مركز زاوية رؤية الثقافية </div>

        {/* {window.innerWidth < 770 && isValidToken && (
          <ul className='list-styling'>
            <li className="nav-item" onClick={onHomePageToggle}>Home</li>
            <li className="nav-item" onClick={onPostComponentToggle}>Manage Posts</li>
            <li className="nav-item" onClick={onCategoryToggle}>Manage Categories</li>
            <li className="nav-item" onClick={onSettingsToggle}>More Settings</li>
            <hr className="separator" />
          </ul>
        )} */}
      <div className='sideBar-list'>
        <ul className='list-styling'>
          {categories.map((category) => (
            <li key={category._id} onClick={() => handleCategoryClick(category)}>
              {category.Name}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
