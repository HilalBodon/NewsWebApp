// import React, { useState, useEffect } from 'react';
// import MenuIcon from '@mui/icons-material/Menu';
// import './Navbar.css';
// import logoimg from "./logoimg.png";
// import Sidebar from '../Sidebar/Sidebar';

// const Navbar = ({ onHomePageToggle, onPostComponentToggle, onCategoryToggle, onSettingsToggle, onCategoryClick, updateCategories }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth > 770);
//   const isValidToken = localStorage.getItem('token') !== null;

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   // const handleCategoryToggle = (category) => {
//   //   console.log('Category toggled:', category);
//   // };

//   const handleCategoryClick = (category) => {
//     onCategoryClick(category);
//   };

//   const handleLogout = () => {
//     // Clear the token from local storage
//     localStorage.removeItem('token');
//     // You may want to perform additional logout-related actions here
//     // (e.g., redirecting the user to the login page)
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsScreenLarge(window.innerWidth > 770);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="menu-icon" onClick={toggleSidebar}>
//         <MenuIcon />
//         <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onCategoryClick={handleCategoryClick} updateCategories={updateCategories} onHomePageToggle={onHomePageToggle} onCategoryToggle={onCategoryToggle} onPostComponentToggle={onPostComponentToggle} onSettingsToggle={onSettingsToggle} />
//       </div>

//       {isScreenLarge && isValidToken && (
//         <ul className="nav-list">
//           <li className="nav-item" onClick={onHomePageToggle}>Home</li>
//           <li className="nav-item" onClick={onPostComponentToggle}>Manage Posts</li>
//           <li className="nav-item" onClick={onCategoryToggle}>Manage Categories</li>
//           <li className="nav-item" onClick={onSettingsToggle}>More Settings</li>
//         </ul>
//       )}

//       {isValidToken && (
//         <div className="logout-btn" onClick={handleLogout}>
//           Logout
//         </div>
//       )}

//       <div className="logo">
//         <img src={logoimg} alt="Logo" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import logoimg from "./logoimg.png";
import Sidebar from '../Sidebar/Sidebar';

const Navbar = ({ onHomePageToggle, onPostComponentToggle, onCategoryToggle, onSettingsToggle, onCategoryClick, updateCategories }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth > 770);
  const [forceRender, setForceRender] = useState(false); // State variable for forcing re-render
  const isValidToken = localStorage.getItem('token') !== null;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryToggle = (category) => {
    console.log('Category toggled:', category);
  };

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setForceRender(true);
  };

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
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}
        onCategoryClick={handleCategoryClick} updateCategories={updateCategories}
        onHomePageToggle={onHomePageToggle} onCategoryToggle={onCategoryToggle}
         onPostComponentToggle={onPostComponentToggle} onSettingsToggle={onSettingsToggle}
         isValidToken={isValidToken}
         />
      </div>

      {isScreenLarge && isValidToken && (
        <ul className="nav-list">
          <li className="nav-item" onClick={onHomePageToggle}>Home</li>
          <li className="nav-item" onClick={onPostComponentToggle}>Manage Posts</li>
          <li className="nav-item" onClick={onCategoryToggle}>Manage Categories</li>
          <li className="nav-item" onClick={onSettingsToggle}>More Settings</li>
        </ul>
      )}

      {isValidToken && (
        <div className="logout-btn" onClick={handleLogout}>
          Logout
        </div>
      )}

      <div className="logo">
        <img src={logoimg} alt="Logo" />
      </div>
    </nav>
  );
};

export default Navbar;
