import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoIosCloseCircleOutline } from "react-icons/io";
import "./index.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <div className="header-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dj1bucjya/image/upload/c_crop,ar_1:1/v1704563038/vijay_logo_vgvcaj.jpg"
            alt="vijay"
            className="logo"
          />
          <p className="logo-name">Art gallery</p>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {showMenu ? (
            <IoIosCloseCircleOutline className="menu-icon" />
          ) : (
            <IoMdMenu className="menu-icon" />
          )}
        </div>
        <ul className="header-ul lg">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/arts" onClick={toggleMenu}>
              Arts
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={toggleMenu}>
              Admin
            </Link>
          </li>
        </ul>
        {showMenu && (
          <ul className="sm-menu">
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/arts" onClick={toggleMenu}>
                Arts
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={toggleMenu}>
                Admin
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
