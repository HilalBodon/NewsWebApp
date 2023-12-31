import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import AboutUs from './aboutUs/aboutUs';

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
  };

  return (
    <footer className="footer">
      <div className="social-media-icons">
        <a href="https://www.facebook.com/RoayaCultural?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://instagram.com/roaya_cultural?igshid=YTQwZjQ0NmI0OA==" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://wa.me/96179152436" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
                <span className="footer-links" onClick={handleGoToTop}>
          الرئيسية
        </span>
      </div>

      <div className="footer-content">

        <Link to="/RoayaTeam" className="footer-links">
          فريق زاوية رؤية
        </Link>
        <span className="footer-links " onClick={handleAboutUsClick}>
          من نحن؟
        </span>
        {isAboutUsOpen && <AboutUs onClose={handleCloseAboutUs} />}
      </div>

      <div className="copyright">
        <p>
          By
          <a href="https://www.quad-bh.com/" target="_blank" rel="noopener noreferrer">
            <i><b> QUAD Digital Media </b></i>
          </a>{' '}
          2024 © All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
