import "./index.css";
import { Link } from "react-router-dom";

const Header = () => (
  <nav>
    <div className="header-container">
      <p>Vijay arts</p>
      <ul className="nav-ul">
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/admin" className="link">
            Admin
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
