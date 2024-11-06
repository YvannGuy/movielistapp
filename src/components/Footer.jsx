import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    Contact us: <a href="mailto:contact@movielistapp.com">contact@movielistapp.com</a>
                </p>
                <p>
                    Phone: <a href="tel:+11234567890">+1 (123) 456-7890</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
