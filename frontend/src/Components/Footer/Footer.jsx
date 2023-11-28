import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer">

      <div className="social-media-icons">
        <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      <div className="copyright">
        <p ><b> Al Bared Camp News. </b> 2023 &copy;  All Rights Reserved.</p>
      </div>

      <div className="footer-links">
        <a href="#">Contact Us</a>
        <a href="#">About Us</a>
      </div>

    </footer>
  );
};

export default Footer;

