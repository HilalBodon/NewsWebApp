// import React from 'react';
// import './Sidebar.css';

// const Sidebar = ({ isOpen, onClose }) => {

//     const handleOverlayClick = () => {
//         if (isOpen) {
//           onClose();
//         }
//       };

//         return (
//     <div>
//       <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
//       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onCategoryToggle }) => {
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

  return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={onCategoryToggle}>Toggle Categories</button>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
