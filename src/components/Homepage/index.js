import "./index.css";
import { Link } from "react-router-dom";
import Header from "../Header";

const HomePage = () => (
  <div>
    <Header />
    <div className="home-container">
      <h1>Welcome to Vijay arts</h1>
      <img
        src="https://res.cloudinary.com/dj1bucjya/image/upload/v1704557047/vijay_tnzu0f.jpg"
        alt="vijay"
        className="vijay-img"
      />
      <p>Arts loading...</p>
      <div className="btn-container">
        <Link to="/admin" className="link">
          <button type="button" className="home-btn">
            Admin
          </button>
        </Link>
        <Link to="/manage" className="link">
          <button type="button" className="home-btn">
            Manage page
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
