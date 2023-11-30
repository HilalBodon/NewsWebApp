// import React, { useState } from 'react';
// import MenuIcon from '@mui/icons-material/Menu';
// import './Navbar.css';
// import Sidebar from '../Sidebar/Sidebar';
// import SearchBar from '../SearchBar/SearchBar';

// const Navbar = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const handleSearch = (query) => {
//     console.log('Search query:', query);
//   };

//   return (
//     <nav className="navbar">
//         <div className="menu-icon" onClick={toggleSidebar}>
//         <MenuIcon />
//       </div>
//       <div className="logo">شبكة أخبار مخيم البارد</div>
//       <ul className="nav-list">
//         <li className="nav-item">Home</li>
//         <li className="nav-item">Posts</li>
//       </ul>

//       <div className="searchBar-div"><SearchBar onSearch={handleSearch} /></div>

//       <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
//     </nav>
//   );
// };

// export default Navbar;


// Navbar.jsx

import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ onCategoryToggle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      <div className="logo">شبكة أخبار مخيم البارد</div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Posts</li>
        <li onClick={onCategoryToggle}>Categories</li>

      </ul>

      <div className="searchBar-div"><SearchBar onSearch={handleSearch} /></div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
