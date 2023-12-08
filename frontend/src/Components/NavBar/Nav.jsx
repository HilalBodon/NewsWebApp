import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ onHomePageToggle , onPostComponentToggle, onCategoryToggle, onCategoryClick, updateCategories }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleCategoryToggle = (category) => {
    console.log('Category toggled:', category);
  };

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      <div className="logo">شبكة أخبار </div>
      <ul className="nav-list">
        <li className="nav-item" onClick={onHomePageToggle}>Home</li>
        <li className="nav-item" onClick={onPostComponentToggle}>Manage Posts </li>
        <li className="nav-item" onClick={onCategoryToggle}> Manage Categories</li>
      </ul>

      <div className="searchBar-div"><SearchBar onSearch={handleSearch} /></div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onCategoryToggle={handleCategoryToggle}
       onCategoryClick={handleCategoryClick} updateCategories={updateCategories} />

    </nav>
  );
};

export default Navbar;
