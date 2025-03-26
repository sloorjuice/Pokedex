import "../css/Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Pokemon Site</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </nav>
    )
}

export default Navbar