import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {

    const handleOverlayClick = () => {
        if (isOpen) {
          onClose();
        }
      };

        return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      </div>
    </div>
  );
};

export default Sidebar;
