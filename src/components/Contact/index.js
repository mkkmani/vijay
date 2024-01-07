import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "./index.css";

const Contact = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted comment:", comment);
    setComment("");
  };

  const handleDetailsChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    } else if (id === "contact") {
      setContactInfo(value);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted details:", { name, contactInfo });
    setName("");
    setContactInfo("");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/art_gallery_02_05/?hl=en", "_blank");
  };

  const handleWhatsappClick = () => {
    const phoneNumber = "+916301312993";
    const message = "Hello! Art gallery";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:vijaykumarkosireddy@gmail.com";
  };

  return (
    <div className="contact-container">
      <div className="comment-section">
        <p className="comment-text">Leave us a comment or suggestion</p>
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={handleChange}
            placeholder="Type your comment here..."
            rows={5}
            cols={30}
          />
          <button type="submit" className="comment-btn">
            Comment
          </button>
        </form>
        <form className="drop-form" onSubmit={handleDetailsSubmit}>
          <h3 className="comment-text">Drop us your details</h3>
          <div className="contact-label-input">
            <label htmlFor="name" className="contact-label">
              Name
            </label>
            <input
              id="name"
              className="contact-input"
              placeholder="Your name..."
              value={name}
              onChange={handleDetailsChange}
            />
          </div>
          <div className="contact-label-input">
            <label htmlFor="contact" className="contact-label">
              Contact
            </label>
            <input
              id="contact"
              className="contact-input"
              placeholder="Whatsapp or email..."
              value={contactInfo}
              onChange={handleDetailsChange}
            />
          </div>
          <button type="submit" className="comment-btn">
            Send
          </button>
        </form>
      </div>
      <div className="contact-div">
        <p className="comment-text">Reach us on</p>
        <div className="icons-div">
          <FaInstagram className="icon" onClick={handleInstagramClick} />
          <FaWhatsapp className="icon" onClick={handleWhatsappClick} />
          <MdOutlineAlternateEmail
            className="icon"
            onClick={handleEmailClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
