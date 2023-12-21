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



  // const handleCreateOrUpdate = async () => {
  //   try {
  //     if (!token) {
  //       setError('Authentication required to manage categories.');
  //       return;
  //     }

  //     if (!categoryName.trim()) {
  //       setError('Category name cannot be empty.');
  //       return;
  //     }

  //     const url = editingCategory
  //       ? `${API_URL}/categories/${editingCategory._id}`
  //       : `${API_URL}/categories`;

  //     const method = editingCategory ? 'PUT' : 'POST';

  //     await fetch(url, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ name: categoryName }),
  //     });

  //     const updatedCategories = await fetchCategoriesData();
  //     setCategories(updatedCategories);
  //     setEditingCategory(null);
  //     setCategoryName('');
  //     setError(null);
  //     updateCategories();
  //   } catch (error) {
  //     console.error('Error creating/updating category:', error);
  //   }
  // };

  // const fetchCategoriesData = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/categories`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  // const handleDelete = async (categoryId) => {
  //   try {
  //     if (!token) {
  //       setError('Authentication required to delete categories.');
  //       return;
  //     }

  //     const confirmed = window.confirm('Are you sure you want to delete this category?');

  //     if (confirmed) {
  //       await fetch(`${API_URL}/categories/${categoryId}`, {
  //         method: 'DELETE',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const updatedCategories = await fetchCategoriesData();
  //       setCategories(updatedCategories);
  //       updateCategories();
  //     }
  //   } catch (error) {
  //     console.error('Error deleting category:', error);
  //   }
  // };

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
                {/* <button className="edit-button" onClick={() => handleEdit(category)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(category._id)}>
                  Delete
                </button> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;
