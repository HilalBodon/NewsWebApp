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
        {/* Remove the close button */}
        {/* <button className="close-btn" onClick={onClose}>
          Close
        </button> */}
        {/* Add sidebar content here */}
      </div>
    </div>
  );
};

export default Sidebar;

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <button className="close-button" onClick={onClose}>
//         ✕
//       </button>
//       <ul className="sidebar-list">
//         <li>Option 1</li>
//         <li>Option 2</li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
