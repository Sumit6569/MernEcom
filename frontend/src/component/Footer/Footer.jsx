// File: frontend/src/components/Footer/Footer.jsx

import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Project Info */}
        <div className="footer-section about">
          <h2 className="logo-text">SumitTrends</h2>
          <p>
            Welcome to SumitTrends, your number one source for all things
            [product, service]. We're dedicated to providing you the very best
            of [product/service], with an emphasis on quality, customer service,
            and uniqueness.
          </p>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> 342802 JIET, Jodhpur ,
              Rajsthan
            </li>
            <li>
              <i className="fas fa-phone-alt"></i> +91 9693366415
            </li>
            <li>
              <i className="fas fa-envelope"></i> infosumitkumar3322@gmail.com
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section links">
          <h2>Useful Links</h2>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=61561167685234"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/sumitk_018/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/sumit-kumar-22002b273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} SumitTrends. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
