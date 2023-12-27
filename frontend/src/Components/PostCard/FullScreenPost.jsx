import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../NavBar/Nav';
import { RingLoader } from "react-spinners";


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};
const FullScreenPost = ({ post, onClose }) => {
  const { postId } = useParams();
  const [postState, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
  const fetchPostDetails = async () => {
    try {
      const response = await axios({
        url: `${BaseURL}/Posts/${postId}`,
        method: 'get',
        params: {
          "fields": "*",
          "media": "images,files",
          "crops": "ax1000",
        },
        headers: Headers,
      });

      const postData = response.data.results[0];
      setPost(postData);
      setLoading(false);
      } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  fetchPostDetails();
}, [postId]);

if (loading) {
  return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // 100% of the viewport height
        }}
      >
        <RingLoader color="#36D7B7" loading={true} size={150} />
      </div>
    );
  };


    let imgurl2 = "https://www.beacdn.com/apps/W9JxND9QAl/dM2x74v8OE/R5VP8Yv4JA/images/i1703079652sab0a65cd644(600xa).png";
    try {
      imgurl2 = postState.images.untitled[0].dir + postState.images.untitled[0].imageax1000;
    } catch (e) {
    console.error('Error getting image URL:', e);
    }

  return (
    <div className="full-screen-post" onClick={onClose}>
      <div className="full-post-content" onClick={(e) => e.stopPropagation()}>
      <Navbar showCategories={false} />
        <div className="full-post-container">
          <div className='img-container'>
            <img src={ imgurl2} alt="" />
          </div>
          <h2 className='text-xl font-medium m-2 fs-content'>{postState.Title}</h2>
          <div dangerouslySetInnerHTML={{ __html: postState.content }} className="fs-content"/>

          {postState.pdfUrl ? (
            <a href={postState.pdfUrl} download className='text-blue-400'>تحميل العدد</a>
          ) : null}
          
          <p className='text-gray-700 mt-2'> {new Date(postState.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPost;





  // useEffect(() => {
  //   const fullScreenPost = document.querySelector('.full-screen-post');
  //   fullScreenPost.scrollTop = 0;
  // }, []);

 


  // useEffect(() => {
  //   const fetchPostDetails = async () => {
  //     try {
  //       const response = await axios({
  //         url: `${BaseURL}/Posts/${post}`,
  //         method: 'get',
  //         params: {
  //           "fields": "*",
  //           "media": "images,files",
  //           "crops": "ax1000",
  //         },
  //         headers: Headers,
  //       });

  //       const postData = response.data;
  //       setPost(postData);
  //       console.log(postData);
  //     } catch (error) {
  //       console.error('Error fetching post details:', error);
  //     }
  //   };

  //   fetchPostDetails();
  // }, [postId]);

  // if (!postState) {
  //   // Handle the case where the post is still being fetched
  //   return <div>Loading...</div>;
  // }
