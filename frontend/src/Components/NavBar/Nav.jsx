import React, { useState } from 'react';
import './Navbar.css';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar">
        <button className="nav-item" onClick={toggleSidebar}>
         =
        </button>
      <div className="logo">Your Logo</div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Posts</li>
      </ul>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
