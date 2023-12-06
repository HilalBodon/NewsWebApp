import React, { useState, useEffect } from 'react';
import "./HomePage.css";
import Navbar from '../../Components/NavBar/Nav';
import NewsTicker from '../../Components/NewsTicker/NewsTicker';
import PostList from '../../Components/PostsList/PostsLists';
import Footer from '../../Components/Footer/Footer';
import CategoryComponent from '../Category/CategoryComponent';
import PostComponent from '../Post/PostComponent';
import Magazine from '../../Components/Magazine/Magazine';
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [isPostComponentVisible, setPostComponentVisible] = useState(false);
  const [isHomePageVisible, setHomePageVisible] = useState(true);
  const [isMagazineVisible, setMagazineVisible] = useState(false);




  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts?sort=createdAt,important');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleOverlayToggle = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  // const handleCategoryToggle = () => {
  //   setCategoryVisible(true);
  //   setPostComponentVisible(false);
  //   setHomePageVisible(false);
  //   setOverlayVisible(false);
  //   setMagazineVisible(false);
  // };

  const handleCategoryToggle = (category) => {
    // console.log('Category toggled:', category);
    setCategoryVisible(true);
    setPostComponentVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
    setMagazineVisible(false);
  
    if (category.name === 'Magazine') {
      handleMagazineToggle();
    } else {
      console.log('else in handle category:', category);
    }
  };


  const handlePostComponentToggle = () => {
    setPostComponentVisible(true);
    setCategoryVisible(false);
    setHomePageVisible(false);
    setOverlayVisible(false);
    setMagazineVisible(false);
  };

  const handleHomePageToggle = () => {
    setHomePageVisible(true);
    setPostComponentVisible(false);
    setCategoryVisible(false);
    setOverlayVisible(false);
    setMagazineVisible(false);
  };

  const handleMagazineToggle = () => {
    setMagazineVisible(true);
    setHomePageVisible(false);
    setPostComponentVisible(false);
    setCategoryVisible(false);
    setOverlayVisible(false);
  };

  return (
    <div>
      <Navbar
        onHomePageToggle={handleHomePageToggle}
        onCategoryToggle={handleCategoryToggle}
        onPostComponentToggle={handlePostComponentToggle}
        onMagazineToggle={handleMagazineToggle}
        />
      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && !isMagazineVisible &&(
        <NewsTicker />
      )}

      {isMagazineVisible && <Magazine />}


      {isHomePageVisible && !isCategoryVisible && !isPostComponentVisible &&(
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/bNyUyrR0PHo"
            title="Playing Video From YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <hr />
  
          {/* <div>
            <div className="text-2xl">All Postssss</div>
            {posts.map((post) => (
              <div className="flex justify-center text-gray-400" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>Important: {post.important ? 'Yes' : 'No'}</p>
                <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
                <p>{post.imgUrl}</p>
              </div>
            ))}
            {isOverlayVisible && (
              <div className="overlay" onClick={handleOverlayToggle}>
                <div className="overlay-content">
                  <PostCard />
                </div>
              </div>
            )}
          </div> */}


        { isHomePageVisible && !isCategoryVisible && !isPostComponentVisible && (
        <div>
          <div className='cards-div'>
            <PostList posts={posts} onCardClick={handleOverlayToggle} />
          </div>     
        </div>
        )}

      {isCategoryVisible && !isHomePageVisible && !isPostComponentVisible && (
        <div>
          <CategoryComponent />
        </div>
      )}

    {isPostComponentVisible && !isCategoryVisible && !isHomePageVisible &&(
      <PostComponent/>
    )}

      <Footer />
    </div>
  );
};

export default HomePage;
