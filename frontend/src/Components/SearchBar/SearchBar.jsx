import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'; // Assuming you want a search icon

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className={`search-bar ${isInputVisible ? 'active' : ''}`}>
      <button onClick={toggleInputVisibility}>
        <FaSearch className="magnifier-style" />
      </button>
      <input
        className="search-style"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ display: isInputVisible ? 'block' : 'none' }}
      />
      <button onClick={handleSearch} style={{ display: isInputVisible ? 'block' : 'none' }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
