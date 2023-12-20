import React, { useEffect } from 'react';

const FullScreenPost = ({ post, onClose }) => {
  console.log(post.images);
  useEffect(() => {
    const fullScreenPost = document.querySelector('.full-screen-post');
    fullScreenPost.scrollTop = 0;
  }, []);


    let imgurl2 = "https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png";
    try {
      imgurl2 = post.images.untitled[0].dir + post.images.untitled[0].imageax1000;
    } catch (e) {

    }
  return (
    <div className="full-screen-post" onClick={onClose}>
      <div className="full-post-content" onClick={(e) => e.stopPropagation()}>
        <div className="full-post-container">
          <div className='img-container'>
            <img src={ imgurl2} alt="" />
          </div>
          <h2 className='text-xl font-medium m-2 fs-content'>{post.Title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="fs-content"/>

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
