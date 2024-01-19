import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "./index.css";

const Contact = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [commentSubmissionStatus, setCommentSubmissionStatus] = useState(null);
  const [detailsSubmissionStatus, setDetailsSubmissionStatus] = useState(null);

  const baseApi = process.env.REACT_APP_API_BASE_URL;
  const wtspLink = process.env.REACT_APP_WHATSAPP_LINK;
  const instaLink = process.env.REACT_APP_INSTA_PAGE_LINK;
  const emailLink = process.env.REACT_APP_EMAIL_LINK;

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDetailsSubmissionStatus(null);
    setCommentSubmissionStatus(null);
    try {
      const details = { comment };
      const api = `${baseApi}/comment`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      const response = await fetch(api, options);

      if (response.ok) {
        setComment("");
        setCommentSubmissionStatus("success");
      } else {
        console.error(`Failed to submit comment. Status: ${response.status}`);
        setCommentSubmissionStatus("error");
      }
    } catch (e) {
      console.error("Error in sending response", e.message);
      setCommentSubmissionStatus("error");
    }
  };

  const handleDetailsChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    } else if (id === "contact") {
      setContactInfo(value);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setDetailsSubmissionStatus(null);
    setCommentSubmissionStatus(null);
    try {
      const details = { name, contact: contactInfo };
      const api = `${baseApi}/contact`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      const response = await fetch(api, options);

      if (response.ok) {
        setName("");
        setContactInfo("");
        setDetailsSubmissionStatus("success");
      } else {
        console.error(
          `Error in sending the details. Status: ${response.status}`
        );
        setDetailsSubmissionStatus("error");
      }
    } catch (e) {
      console.error(`Error in sending the response. ${e.message}`);
      setDetailsSubmissionStatus("error");
    }
  };

  const handleInstagramClick = () => {
    window.open(instaLink, "_blank");
  };

  const handleWhatsappClick = () => {
    const message = "Hello! Art gallery";

    const whatsappUrl = `${wtspLink}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = emailLink;
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
        {commentSubmissionStatus === "success" && (
          <p className="success-message">Received your response</p>
        )}
        {commentSubmissionStatus === "error" && (
          <p className="error-message">
            Error submitting comment. Please try again.
          </p>
        )}
      </div>
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
        {detailsSubmissionStatus === "success" && (
          <p className="success-message">Your details submitted successfully</p>
        )}
        {detailsSubmissionStatus === "error" && (
          <p className="error-message">
            Error submitting details. Please try again.
          </p>
        )}
      </form>
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
