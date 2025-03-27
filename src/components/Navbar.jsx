import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="/logo.png" alt="Logo" />
                <Link to="/">Pokedex Unlimited</Link>
            </div>
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>
            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/all">A-Z</Link>
            </div>
        </nav>
    );
}

export default Navbar;