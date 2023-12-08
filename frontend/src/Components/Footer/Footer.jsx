import React, { useState } from 'react';
import './Footer.css';
import { FaFacebook,FaWhatsapp, FaInstagram } from 'react-icons/fa'; 
import AboutUs from './AboutUs/AboutUs';
import {  } from 'react-icons/fa6';
import HomePage from '../../Views/HomePage/HomePage';

const Footer = () => {


  const [isAboutUsOpen, setAboutUsOpen] = useState(false);

  const handleAboutUsClick = () => {
    setAboutUsOpen(true);
  };

  const handleCloseAboutUs = () => {
    setAboutUsOpen(false);
  };

    const handleGoToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  

  return (
    <footer className="footer">

      <div className="social-media-icons">
        <a href="https://www.facebook.com/RoayaCultural?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com/roaya_cultural?igshid=YTQwZjQ0NmI0OA==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://wa.me/96179152436" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
      </div>

      <div className="copyright">
        <p ><b> By Quad Business House</b> 2024 &copy;  All Rights Reserved.</p>
      </div>

      <div className="footer-content">
      <span className="footer-links" onClick={handleGoToTop}>
        Home
      </span>
      <span className="footer-links" onClick={handleAboutUsClick}>
          About Us
        </span>
       {isAboutUsOpen && <AboutUs onClose={handleCloseAboutUs} />}
      </div>
    </footer>
  );
};

export default Footer;

