import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>
        ✕
      </button>
      <ul className="sidebar-list">
        <li>Option 1</li>
        <li>Option 2</li>
      </ul>
    </div>
  );
};

export default Sidebar;
