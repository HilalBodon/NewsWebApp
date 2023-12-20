import React, { useEffect } from 'react';

const FullScreenPost = ({ post, onClose }) => {
  useEffect(() => {
    const fullScreenPost = document.querySelector('.full-screen-post');
    fullScreenPost.scrollTop = 0;
  }, []);
  return (
    <div className="full-screen-post" onClick={onClose}>
      <div className="full-post-content" onClick={(e) => e.stopPropagation()}>
        <div className="full-post-container">
          <img src={post.imgUrl} alt="" />
          <h2 className='text-xl font-medium m-2'>{post.Title}</h2>
          <div dangerouslySetInnerHTML={{__html: post.content}} />


          {post.pdfUrl ? (
            <a href={post.pdfUrl} download className='text-blue-400'>تحميل العدد</a>
          ) : null}
          
          <p className='text-gray-700 mt-2'> {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPost;
