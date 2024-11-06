import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import logomid from '../assets/logofinal.png'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div>
                <Link className="link-items" to="/">
                    <img src={logomid} alt="Logomiddle" className="logo" />
                </Link>
            </div>
            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/">HOME</Link>
                <Link to="/addEditMovieForm">ADD MOVIE</Link>
                {/*<Link to="/mylist">MY LIST</Link>*/}
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                ☰
            </div>
        </header>
    );
};

export default Navbar;
