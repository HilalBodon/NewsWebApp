// import React, { useState, useEffect } from 'react';
// import './PostComponent.css';
// import MyEditor from './MyEditor';

// const API_URL = 'http://localhost:8080/api';

// const PostComponent = ({ updatePosts }) => {

//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [editingPost, setEditingPost] = useState(null);
//   const [postData, setPostData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     important: false,
//     imgUrl: '',
//     pdfUrl:'',
//   });

//   const [error, setError] = useState(null);


//   const [token, setToken] = useState('');

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//       fetchPosts(storedToken);
//       fetchCategories(storedToken);
//     }
//   }, []);

//   const fetchPosts = async (token) => {
//     try {
//       const response = await fetch(`${API_URL}/posts`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setError('Error fetching posts. Please try again later.');
//     }
//   };

//   const fetchCategories = async (token) => {
//     try {
//       const response = await fetch(`${API_URL}/categories`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setError('Error fetching categories. Please try again later.');
//     }
//   };

// const handleCreateOrUpdate = async () => {
//     try {
//       const url = editingPost ? `${API_URL}/posts/${editingPost._id}` : `${API_URL}/posts`;
  
//       const requestBody = {
//         title: postData.title,
//         content: postData.content,
//         important: postData.important,
//         imgUrl: postData.imgUrl,
//         pdfUrl: postData.pdfUrl,
//       };
  
//       const selectedCategory = categories.find((category) => category.name === postData.category);
//       if (selectedCategory) {
//         requestBody.category = selectedCategory._id;
//       } else {
//         requestBody.category = postData.category;
//       }

//       console.log('Request URL:', url);
// console.log('Request Method:', editingPost ? 'PATCH' : 'POST');
// console.log('Request Headers:', {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${token}`,
// });
// console.log('Request Body:', JSON.stringify(requestBody));


//       const response = await fetch(url, {
//         method: editingPost ? 'PATCH' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });
      
//   console.log(token)
//       if (!response.ok) {
//         // Rest of the error handling code...
//       }
//       updatePosts();
//       fetchPosts();
//       setEditingPost(null);
//       setPostData({
//         title: '',
//         content: '',
//         category: '',
//         important: false,
//         imgUrl: '',
//         pdfUrl: '',
//       });
//       setError(null);
//     } catch (error) {
//       console.error('Error creating/updating post:', error);
//       setError('Error creating/updating post. Please try again.');
//     }
//   };
  

//   const handleDelete = async (postId) => {
//     try {
//       const confirmed = window.confirm('Are you sure you want to delete this post?');

//       if (confirmed) {
//         await fetch(`${API_URL}/posts/${postId}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         updatePosts();
//         fetchPosts();
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       setError('Error deleting post. Please try again.');
//     }
//   };

//   return (
//     <div className="post-container">
//       <div className="text-4xl">All Posts</div>
//       <div className="post-form">
//         <input
//           type="text"
//           placeholder="Enter post title"
//           value={postData.title}
//           onChange={(e) => setPostData({ ...postData, title: e.target.value })}
//         />

//         <div className='post-content'>
//           <MyEditor editorState={postData.content} setEditorState={(newEditorState) => setPostData({ ...postData, content: newEditorState })} />
//         </div>
        
//         <select
//           value={postData.category}
//           onChange={(e) => {
//             const selectedCategory = e.target.value;
//             setPostData({ ...postData, category: selectedCategory });
//             console.log('Selected Category:', selectedCategory);
//           }}
//         >
//           <option value="">Select a category</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>

//         {postData.category === 'Magazine' && (
//                 <input
//                 type="text"
//                 placeholder="Enter The PDF File URL"
//                 value={postData.pdfUrl}
//                 onChange={(e) => setPostData({ ...postData, pdfUrl: e.target.value })}
//               />
//         )}

//         <label>
//           <input
//             type="checkbox"
//             checked={postData.important}
//             onChange={() => setPostData({ ...postData, important: !postData.important })}
//           />
//           Important
//         </label>

//         <input
//           type="text"
//           placeholder="Enter image URL"
//           value={postData.imgUrl}
//           onChange={(e) => setPostData({ ...postData, imgUrl: e.target.value })}
//         />

//         <button className={`${editingPost ? 'update-button' : 'create-button'}`} onClick={handleCreateOrUpdate}>
//           {editingPost ? 'Update Post' : 'Create Post'}
//         </button>

//         {error && <p className="error-message">{error}</p>}
//       </div>

//       <ul className="post-list">
//         {posts.map((post) => (
//           <li key={post._id}>
//             <div className="post-item">
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
















import React, { useState, useEffect } from 'react';
import './PostComponent.css';
import MyEditor from './MyEditor';

const API_URL = 'http://localhost:8080/api';

const PostComponent = ({ updatePosts }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    important: false,
    imgUrl: '',
    pdfUrl: '',
  });

  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchPosts(storedToken);
      fetchCategories(storedToken);
    }
  }, []);

  const fetchPosts = async (token) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts. Please try again later.');
    }
  };

  const fetchCategories = async (token) => {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories. Please try again later.');
    }
  };

  const handleEdit = (post) => {
    // Set editingPost to the selected post
    setEditingPost(post);

    // Populate the form with the values of the selected post
    setPostData({
      title: post.title,
      content: post.content,
      category: post.category.name, // Assuming category is an object with a 'name' property
      important: post.important,
      imgUrl: post.imgUrl,
      pdfUrl: post.pdfUrl,
    });
  };

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Rest of the error handling code...
      }
      updatePosts();
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
            Authorization: `Bearer ${token}`,
          },
        });

        updatePosts();
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

        <div className='post-content'>
          <MyEditor
            editorState={postData.content}
            setEditorState={(newEditorState) => setPostData({ ...postData, content: newEditorState })}
          />
        </div>

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

        {postData.category === 'مجلة رؤية' && (
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
                <button className="edit-button" onClick={() => handleEdit(post)}>
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
