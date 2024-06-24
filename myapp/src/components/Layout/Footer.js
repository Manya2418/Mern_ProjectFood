import React, { useState } from 'react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle subscription form submission logic here
        console.log(`Subscribed with email: ${email}`);
        setEmail('');
    };

    return (
        <footer className="footer-container" id="myFooter">
            <div className="footer-columns">
                <div className="footer-column">
                    <div className="footer-logo-container">
                        <img src="../../images/logo2.jpg" alt="Logo 1" className="footer-logo" />
                    </div>
                </div>
                <div className="footer-column">
                    <h3>About Us</h3>
                    <p>Creative and expressive way of conveying the idea that the taste and experience of the food at a particular restaurant.</p>
                </div>
                {/* Column 3: Additional Quick Links */}
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                    <li><a href="/#">Home</a></li>
                        <li><a href="/#about">About Us</a></li>
                        <li><a href="/#contact">Contact Us</a></li>
                        
                    </ul>
                </div>
                {/* Column 4: Contact Info */}
                <div className="footer-column">
                    <h3>Contact Info</h3>
                    <p>Email: contact@example.com</p>
                    <p>Phone: +1234567890</p>
                    <p>Address: 123 Street, City, Country</p>
                </div>
            
            {/* Subscribe Section */}
            <div className="footer-subscribe">
                <h3>Subscribe to Our Newsletter</h3>
                <form onSubmit={handleSubmit} className="subscribe-form">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
            
            <div className="footer-social">
                <div className="social-icons">
                    <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#linkedin"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#instagram"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            </div>
            </div>
        </footer>
    );
};

export default Footer;
