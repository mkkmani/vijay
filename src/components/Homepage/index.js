import "./index.css";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="ccc">
    <div>
      <div className="home-container">
        <div className="welcome-div">
          <h1 className="welcome">Welcome to Art gallery</h1>
          <p className="tag-line">Discover the Beauty of Pencil Artistry</p>
          <p className="home-desc">
            Welcome art enthusiasts and admirers of fine art! At Art gallery ,
            we celebrate the captivating world of pencil artistry. Dive into a
            realm where graphite meets imagination, capturing life’s intricacies
            in exquisite detail.
          </p>
        </div>
        <div className="home-img-div">
          <img
            src="https://res.cloudinary.com/dj1bucjya/image/upload/v1704567645/Screenshot_2024-01-07_001724-removebg-preview_h3sfaa.png"
            className="home-img"
            alt="img"
          />
        </div>
      </div>
      <div className="custom-div">
        <h2 className="custom-msg">
          Custom Pencil Art - Crafted Exclusively for You
        </h2>
        <p className="custom-desc">
          Experience the charm of personalized pencil art created just for you.
          From portraits to detailed sketches, each piece is carefully
          hand-drawn to capture your vision and special memories with classic
          grace. Let's work together to turn your ideas into beautiful pencil
          artworks that speak uniquely to your heart and space.
        </p>
        <div className="custom-btn-div">
          <Link to="/arts">
            <button type="button" className="custom-btn explore-btn">
              Explore
            </button>
          </Link>
          <Link to="/contact">
            <button type="button" className="custom-btn contact-button">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
