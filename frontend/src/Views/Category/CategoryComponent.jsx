import React, { useState, useEffect } from 'react';
import './CategoryComponent.css';

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  // Example: Replace 'isAuthenticated' with your actual authentication state
  const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (!isAuthenticated) {
        // Handle unauthenticated user attempting to create/update
        setError('Authentication required to manage categories.');
        return;
      }

      if (!categoryName.trim()) {
        setError('Category name cannot be empty.');
        return;
      }

      const url = editingCategory
        ? `http://localhost:8080/api/categories/${editingCategory._id}`
        : 'http://localhost:8080/api/categories';

      const method = editingCategory ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const updatedCategories = await fetchCategoriesData();
      setCategories(updatedCategories);
      setEditingCategory(null);
      setCategoryName('');
      setError(null);
    } catch (error) {
      console.error('Error creating/updating category:', error);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      if (!isAuthenticated) {
        // Handle unauthenticated user attempting to delete
        setError('Authentication required to delete categories.');
        return;
      }

      // Add a confirmation dialog here if needed
      const confirmed = window.confirm('Are you sure you want to delete this category?');

      if (confirmed) {
        await fetch(`http://localhost:8080/api/categories/${categoryId}`, {
          method: 'DELETE',
        });

        const updatedCategories = await fetchCategoriesData();
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
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
          className={editingCategory ? 'update-button' : 'create-button'}
          onClick={handleCreateOrUpdate}
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
                <button className="edit-button" onClick={() => handleEdit(category)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;














// import React, { useState, useEffect } from 'react';

// import './CategoryComponent.css';

// const CategoryComponent = () => {
//   const [categories, setCategories] = useState([]);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [categoryName, setCategoryName] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/categories');
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCreateOrUpdate = async () => {
//     try {
//       if (editingCategory) {
//         await fetch(`http://localhost:8080/api/categories/${editingCategory._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ name: categoryName }),
//         });
//       } else {
//         await fetch('http://localhost:8080/api/categories', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ name: categoryName }),
//         });
//       }

//       const response = await fetch('http://localhost:8080/api/categories');
//       const data = await response.json();
//       setCategories(data);
//       setEditingCategory(null);
//       setCategoryName('');
//     } catch (error) {
//       console.error('Error creating/updating category:', error);
//     }
//   };

//   const handleDelete = async (categoryId) => {
//     try {
//       await fetch(`http://localhost:8080/api/categories/${categoryId}`, {
//         method: 'DELETE',
//       });

//       const response = await fetch('http://localhost:8080/api/categories');
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     }
//   };

//   const handleEdit = (category) => {
//     setEditingCategory(category);
//     setCategoryName(category.name);
//   };

//   return (
//     <div className="category-container">

//       <h1 className='text-4xl'> Manage All Categories</h1>

//       <div className="category-form">
//         <input 
//           type="text"
//           placeholder="Enter category name"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//         />
//         <button className={editingCategory ? 'update-button' : 'create-button'} onClick={handleCreateOrUpdate}>
//           {editingCategory ? 'Update Category' : 'Create Category'}
//         </button>
//       </div>

//       <ul className="category-list">
//         {categories.map((category) => (
//           <li key={category._id}>
//             <div className="category-item">
//               <span>{category.name}</span>
//               <div className="category-buttons">
//                 <button className="edit-button" onClick={() => handleEdit(category)}>
//                   Edit
//                 </button>
//                 <button className="delete-button" onClick={() => handleDelete(category._id)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryComponent;
