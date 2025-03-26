import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="/logo.png" alt="Logo" />
                <Link to="/">Pokedex</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
                <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sloorjuice" data-description="Support me on Buy me a coffee!" data-message="Hey!" data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
            </div>
        </nav>
    );
}

export default Navbar;