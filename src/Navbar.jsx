import { Link } from "react-router-dom";
import "./Navbar.css"; // import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Sasi College</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/manage">Details of Club</Link>
      </div>
    </nav>
  );
}

export default Navbar;
import "./Navbar.css";