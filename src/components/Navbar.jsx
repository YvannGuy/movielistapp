import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div>
                <Link className="logo" to="/">WTW APP</Link>
            </div>
            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/">MovieList</Link>
                <Link to="/my-list">Movies</Link>
                <Link to="/add">Add Movie</Link>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." className="search-input" />
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                ☰
            </div>
        </header>
    );
};

export default Navbar;
