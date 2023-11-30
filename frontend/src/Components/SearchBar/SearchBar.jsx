// SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';
import { FaMagnifyingGlass } from "react-icons/fa6";


const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input className='text-slate-700'
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}><FaMagnifyingGlass  className='text-2xl'/></button>
    </div>
  );
};

export default SearchBar;
