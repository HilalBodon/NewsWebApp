import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../SearchBar/SearchBar';
import Magazine from '../Magazine/Magazine';
import CategoryContents from '../../Views/CategoryContent/CategoryContent';

const Navbar = ({ onHomePageToggle , onPostComponentToggle, onCategoryToggle, onMagazineToggle, onCategoryClick }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showMagazine, setShowMagazine] = useState(false);

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
    console.log('Category toggled:', category);
    onCategoryClick(category);
  };

  const handleMagazineToggle = () => {
    setShowMagazine(!showMagazine);
  };
  

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      <div className="logo">شبكة أخبار مخيم البارد</div>
      <ul className="nav-list">
        <li className="nav-item" onClick={onHomePageToggle}>Home</li>
        <li className="nav-item" onClick={onPostComponentToggle}>Posts</li>
        <li className="nav-item" onClick={onCategoryToggle}>Categories</li>
      </ul>

      <div className="searchBar-div"><SearchBar onSearch={handleSearch} /></div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onCategoryToggle={handleCategoryToggle} onMagazineToggle={onMagazineToggle}  onCategoryClick={handleCategoryClick} />
      {/* {showMagazine && <Magazine/>} */}

    </nav>
  );
};

export default Navbar;
