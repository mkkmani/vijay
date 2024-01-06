import "./index.css";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Header from "../Header";

const ManageRoute = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageId, setImageId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const token = Cookies.get("artToken");

  const activateOption = (e) => {
    setActiveOption(e.target.name);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeLink = (e) => {
    setImageLink(e.target.value);
  };

  const onChangeImageId = (e) => {
    setImageId(e.target.value);
  };

  const submitImageDetails = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const details = { name: name, link: imageLink };
    const api = "https://vijayarts.onrender.com/admin/gallery/add";
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      setStatusMessage(data.message);
      setSuccess(true);
    } catch (error) {
      console.error("error in image adding", error);
    }
  };
  if (token === undefined) {
    return <Redirect to="/admin" />;
  }
  return (
    <>
      <Header />
      <div className="manage-container">
        <h1>Manage your page here</h1>
        <div className="manage-div">
          <div className="options-container">
            <button
              type="button"
              name="add option"
              className="manage-btn"
              onClick={activateOption}
            >
              Add Image
            </button>
            {activeOption === "add option" && (
              <form className="form" onSubmit={submitImageDetails}>
                <h3>Add image</h3>
                <div className="label-input">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                    onChange={onChangeName}
                    value={name}
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="link" className="form-label">
                    Image link
                  </label>
                  <input
                    id="link"
                    className="form-input"
                    type="text"
                    onChange={onChangeLink}
                    value={imageLink}
                  />
                </div>
                <div>
                  <button type="submit" className="form-btn">
                    Add image
                  </button>
                </div>
                {statusMessage !== "" && (
                  <p className="status-msg">{statusMessage}</p>
                )}
                {success && (
                  <p className="succ">Save id for future reference</p>
                )}
              </form>
            )}
          </div>

          <div className="options-container">
            <button
              type="button"
              name="remove"
              className="manage-btn"
              onClick={activateOption}
            >
              Remove image
            </button>
            {activeOption === "remove" && (
              <form className="form">
                <h3>Remove image</h3>
                <div className="label-input">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                    onChange={onChangeName}
                    value={name}
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="id" className="form-label">
                    Image id
                  </label>
                  <input
                    id="id"
                    className="form-input"
                    type="text"
                    onChange={onChangeImageId}
                    value={imageId}
                  />
                </div>
                <div>
                  <div>
                    <button type="submit" className="form-btn" disabled>
                      Delete image
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRoute;
