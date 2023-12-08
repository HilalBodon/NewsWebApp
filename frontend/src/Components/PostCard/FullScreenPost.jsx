// import React from 'react';

// const FullScreenPost = ({ post, onClose }) => {
//   return (
//     <div className="full-screen-post">
//       <div className="full-overlay" onClick={onClose}></div>
//       <div className="full-post-content">
//         <div className="full-post-container">
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           <p>Category: {post.category}</p>
//           <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
//           <img src={post.imgUrl} alt="Post Image" />
//           <p>Testing overlay content</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullScreenPost;




import React, { useEffect } from 'react';

const FullScreenPost = ({ post, onClose }) => {
  useEffect(() => {
    // Set the scroll position to the top when the component mounts
    const fullScreenPost = document.querySelector('.full-screen-post');
    fullScreenPost.scrollTop = 0;

    // Optionally, you can add event listeners to handle focus or other interactions
    // fullScreenPost.addEventListener('click', handleClick);
    // return () => fullScreenPost.removeEventListener('click', handleClick);
  }, []);


  // const downloadPdf = (pdfUrl) => {
  //   // Create an anchor element
  //   const anchor = document.createElement('a');
  //   anchor.href = pdfUrl;
  //   anchor.target = '_blank'; // Open the link in a new tab
  //   anchor.download = 'downloaded_file.pdf'; // Set the default download file name
  
  //   // Trigger a click event on the anchor to start the download
  //   document.body.appendChild(anchor);
  //   anchor.click();
  
  //   // Remove the anchor from the DOM
  //   document.body.removeChild(anchor);
  // };
  

  return (
    <div className="full-screen-post" onClick={onClose}>
      <div className="full-post-content" onClick={(e) => e.stopPropagation()}>
        <div className="full-post-container">
          <img src={post.imgUrl} alt="" />
          <h2 className='text-xl font-medium m-2'>{post.title}</h2>
          <p>{post.content}</p>
          <a href={post.pdfUrl} download className='text-blue-400'>تحميل العدد</a>
          {/* <a href="#" className='text-blue-400' onClick={() => downloadPdf(post.pdfUrl)}>تحميل العدد</a> */}
          
          <p className='text-gray-700 mt-2'> {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPost;
