import React, { useState, useEffect } from 'react';
import './PostComponent.css';

const API_URL = 'http://localhost:8080/api';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY0ZTlmN2NkZGU2MDFmNTZjMmJhNDgiLCJpYXQiOjE3MDE5Njk5MjgsImV4cCI6MTcwMjAxMzEyOH0.Fvcn9JcY1WHPEH6m5hRU3noMGu8YlI4b0hf3S0kgR-w';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    important: false,
    imgUrl: '',
    pdfUrl:'',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts. Please try again later.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories. Please try again later.');
    }
  };

//   const handleCreateOrUpdate = async () => {
//     try {
//       const url = editingPost ? `${API_URL}/posts/${editingPost._id}` : `${API_URL}/posts`;

//       const response = await fetch(url, {
//         method: editingPost ? 'PATCH' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${API_TOKEN}`,
//         },
//         body: JSON.stringify(postData),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           console.error('Token expired. Please log in.');
//           setError('Token expired. Please log in.');
//           return;
//         }

//         console.error('Error:', response.status, response.statusText);
//         const errorData = await response.json();
//         console.error('Error Data:', errorData);
//         setError('Error creating/updating post. Please try again.');
//         return;
//       }

//       fetchPosts();
//       setEditingPost(null);
//       setPostData({
//         title: '',
//         content: '',
//         category: '',
//         important: false,
//         imgUrl: '',
//       });
//       setError(null);
//     } catch (error) {
//       console.error('Error creating/updating post:', error);
//       setError('Error creating/updating post. Please try again.');
//     }
//   };


const handleCreateOrUpdate = async () => {
    try {
      const url = editingPost ? `${API_URL}/posts/${editingPost._id}` : `${API_URL}/posts`;
  
      const requestBody = {
        title: postData.title,
        content: postData.content,
        important: postData.important,
        imgUrl: postData.imgUrl,
        pdfUrl: postData.pdfUrl,
      };
  
      // If the selected category is predefined, use its ObjectId
      const selectedCategory = categories.find((category) => category.name === postData.category);
      if (selectedCategory) {
        requestBody.category = selectedCategory._id;
      } else {
        // If the category is custom, use it as a string
        requestBody.category = postData.category;
      }
  
      const response = await fetch(url, {
        method: editingPost ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        // Rest of the error handling code...
      }
  
      fetchPosts();
      setEditingPost(null);
      setPostData({
        title: '',
        content: '',
        category: '',
        important: false,
        imgUrl: '',
        pdfUrl: '',
      });
      setError(null);
    } catch (error) {
      console.error('Error creating/updating post:', error);
      setError('Error creating/updating post. Please try again.');
    }
  };
  
  
  



  const handleDelete = async (postId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this post?');

      if (confirmed) {
        await fetch(`${API_URL}/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post. Please try again.');
    }
  };

  return (
    <div className="post-container">
      <div className="text-4xl">All Posts</div>
      <div className="post-form">
        <input
          type="text"
          placeholder="Enter post title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <div className='post-content'
          contentEditable
          placeholder="Enter post content"
          onInput={(e) => setPostData({ ...postData, content: e.target.innerHTML })}
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />

<select
  value={postData.category}
  onChange={(e) => {
    const selectedCategory = e.target.value;
    setPostData({ ...postData, category: selectedCategory });
    console.log('Selected Category:', selectedCategory);
  }}
>
  <option value="">Select a category</option>
  {categories.map((category) => (
    <option key={category._id} value={category.name}>
      {category.name}
    </option>
  ))}
</select>

{postData.category === 'Magazine' && (
        <input
        type="text"
        placeholder="Enter The PDF File URL"
        value={postData.pdfUrl}
        onChange={(e) => setPostData({ ...postData, pdfUrl: e.target.value })}
      />
)}

        <label>
          <input
            type="checkbox"
            checked={postData.important}
            onChange={() => setPostData({ ...postData, important: !postData.important })}
          />
          Important
        </label>

        <input
          type="text"
          placeholder="Enter image URL"
          value={postData.imgUrl}
          onChange={(e) => setPostData({ ...postData, imgUrl: e.target.value })}
        />

        <button className={`${editingPost ? 'update-button' : 'create-button'}`} onClick={handleCreateOrUpdate}>
          {editingPost ? 'Update Post' : 'Create Post'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id}>
            <div className="post-item">
              <span>{post.title}</span>
              <div className="button-container">
                <button className="edit-button" onClick={() => setEditingPost(post)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(post._id)}>
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

export default PostComponent;






// import React, { useState, useEffect } from 'react';
// import './PostComponent.css';

// const PostComponent = () => {
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [postData, setPostData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     important: false,
//     imgUrl: '',
//   });

//  const Token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY0ZTlmN2NkZGU2MDFmNTZjMmJhNDgiLCJpYXQiOjE3MDE3MDk2NDIsImV4cCI6MTcwMTc1Mjg0Mn0.VgkmGrc6qp7lbOaRg0KsOz-jWqEzICHK12sNmxfPRD8"

//   useEffect(() => {
//     fetchPosts();
//     fetchCategories();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/posts', {
//         headers: {
//           Authorization: `Bearer ${Token}`,
//         },
//       });
//       const data = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/categories');
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };


// const handleCreateOrUpdate = async () => {
//     try {
//       const url = editingPost ? `http://localhost:8080/api/posts/${editingPost._id}` : 'http://localhost:8080/api/posts';
  
//       const response = await fetch(url, {
//         method: editingPost ? 'PATCH' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${Token}`,
//         },
//         body: JSON.stringify(postData),
//       });
  
//       if (!response.ok) {
//         if (response.status === 401) {
//           console.error('Token expired. Please log in.');
//           return;
//         }
  
//         console.error('Error:', response.status, response.statusText);
//         const errorData = await response.json();
//         console.error('Error Data:', errorData);
//         return;
//       }
  
//       fetchPosts();
//       setEditingPost(null);
//       setPostData({
//         title: '',
//         content: '',
//         category: '',
//         important: false,
//         imgUrl: '',
//       });
//     } catch (error) {
//       console.error('Error creating/updating post:', error);
//     }
//   };
  
//   const handleDelete = async (postId) => {
//     try {
//       await fetch(`http://localhost:8080/api/posts/${postId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${Token}`,
//         },
//       });

//       fetchPosts();
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   return (
//     <div className="post-container">
//       <h2>All Posts</h2>
//       <div className="post-form">
//         <input
//           type="text"
//           placeholder="Enter post title"
//           value={postData.title}
//           onChange={(e) => setPostData({ ...postData, title: e.target.value })}
//         />
//         <textarea
//           placeholder="Enter post content"
//           value={postData.content}
//           onChange={(e) => setPostData({ ...postData, content: e.target.value })}
//         />

//         {/* Category Dropdown */}
//         <select
//           value={postData.category}
//           onChange={(e) => setPostData({ ...postData, category: e.target.value })}
//         >
//           <option value="">Select a category</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>

//         {/* Importance Checkbox */}
//         <label>
//           <input
//             type="checkbox"
//             checked={postData.important}
//             onChange={() => setPostData({ ...postData, important: !postData.important })}
//           />
//           Important
//         </label>

//         {/* Image URL Input */}
//         <input
//           type="text"
//           placeholder="Enter image URL"
//           value={postData.imgUrl}
//           onChange={(e) => setPostData({ ...postData, imgUrl: e.target.value })}
//         />

//         <button onClick={handleCreateOrUpdate}>{editingPost ? 'Update Post' : 'Create Post'}</button>
//       </div>

//       <ul className="post-list">
//         {posts.map((post) => (
//           <li key={post._id} className="post-item">
//             <div>
//               <span>{post.title}</span>
//               <div className="button-container">
//                 <button className="edit-button" onClick={() => setEditingPost(post)}>
//                   Edit
//                 </button>
//                 <button className="delete-button" onClick={() => handleDelete(post._id)}>
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
 
// export default PostComponent;
