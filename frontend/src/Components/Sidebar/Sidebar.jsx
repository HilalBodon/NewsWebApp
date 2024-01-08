import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Sidebar = ({ isOpen, onClose, onCategoryClick, updateCategories, onHomePageToggle, onPostComponentToggle, onCategoryToggle, onSettingsToggle, isValidToken, showCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Posts/Categories',
          method: 'get',
          params: {
            "fields": "Name",
            "order": "Name",
          },
          headers: Headers,
        });

        // Sort the data by Name
        const sortedCategories = response.data.results.sort((a, b) => a.Name.localeCompare(b.Name));

        // Find the index of the category you want to appear first (e.g., "Main Category")
        const mainCategoryIndex = sortedCategories.findIndex(category => category.Name === 'الرئيسية');

        // If the category is found, move it to the front of the array
        if (mainCategoryIndex !== -1) {
          const mainCategory = sortedCategories.splice(mainCategoryIndex, 1)[0];
          sortedCategories.unshift(mainCategory);
        }

        // Set the sorted and reordered categories in state
        setCategories(sortedCategories);

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
    onCategoryClick(category);
  };

  return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='roaya-name'>مركز زاوية رؤية الثقافية </div>
      <br />
        <div className='sideBar-list'>
        {!showCategories ? (
        <div>
          <Link to="/">
            <button className='back-button'>العودة الى الرئيسية</button>
          </Link>
        </div>
      ) : (
        <ul className='list-styling'>
          {categories.map((category) => (
            <li key={category._id} onClick={() => handleCategoryClick(category)}>
              {category.Name}
            </li>
          ))}
        </ul>
      )}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;

