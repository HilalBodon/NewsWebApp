import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onCategoryToggle, onMagazineToggle }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleOverlayClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  const handleCategoryClick = (category) => {
    if (category.type === 'Magazine') {
      onMagazineToggle();
    } else {
      onCategoryToggle(category);
    }
  };

  
  return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          {categories.map((category) => (
            <li key={category._id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
          ))}
          {/* onClick event to trigger the Magazine component */}
          {/* <li onClick={onMagazineToggle}>Magazine</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
