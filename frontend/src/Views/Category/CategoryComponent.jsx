import React, { useState, useEffect } from 'react';
import './CategoryComponent.css';
import axios from 'axios';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const CategoryComponent = ({ updateCategories }) => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchCategories();
    }
  }, []);


  const fetchCategories = async () => {
    try {
      const response = await axios({
        url: BaseURL + '/Posts/Categories',
        method: 'get',
        headers: Headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  return (
    <div className="category-container">
      <h1 className="text-4xl">Manage All Categories</h1>

      <div className="category-form">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          // className={editingCategory ? 'update-button' : 'create-button'}
          // onClick={handleCreateOrUpdate}
        >
          {editingCategory ? 'Update Category' : 'Create Category'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category._id}>
            <div className="category-item">
              <span>{category.name}</span>
              <div className="category-buttons">

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;
