// src/components/Header.jsx
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">WTW APP</Link>
            <Link to="/" >MovieList</Link>
            <Link to="/my-list" >Movies</Link>
            <Link to="/add">Add Movie</Link>
        </header>
    );
};

export default Navbar;
