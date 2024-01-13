import "./index.css";
import { Redirect, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const ManageRoute = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageId, setImageId] = useState("");
  const [statusMessage, setStatusMessage] = useState([]);
  const [success, setSuccess] = useState(false);
  const [comments, setComments] = useState([]);
  const token = Cookies.get("artToken");
  const history = useHistory();

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

  const onClickLogout = () => {
    Cookies.remove("artToken");
    history.push("/");
  };

  const submitImageDetails = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const details = { name: name, imageUrl: imageLink };
    const api = "https://vijayarts.onrender.com/gallery";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      setStatusMessage(data);

      setName("");
      setImageLink("");

      setSuccess(true);
    } catch (error) {
      console.error("error in submitting details", error);
    }
  };

  const removeImage = async (e) => {
    e.preventDefault();
    const api = "https://vijayarts.onrender.com/gallery";
    const details = { id: imageId };
    const options = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const result = await fetch(api, options);
    const data = result.json();
  };

  const viewComments = async (e) => {
    setActiveOption(e.target.name);
    const api = "https://vijayarts.onrender.com/comments";
    const options = {
      method: "GET",
    };

    try {
      const res = await fetch(api, options);
      const data = await res.json();

      const updatedData = data.comments.map((each) => ({
        id: each._id,
        comment: each.comment,
      }));
      console.log("updated data", updatedData);
      setComments(updatedData);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  if (token === undefined) {
    return <Redirect to="/admin" />;
  }
  return (
    <>
      <div className="manage-container">
        <div className="logout-btn-container">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
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
                  <button type="submit" className="form-btn add">
                    Add image
                  </button>
                </div>
                {statusMessage.message !== "" && (
                  <p className="status-msg">{`${statusMessage.message} with id ${statusMessage.imageId}`}</p>
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
              <form className="form" onSubmit={removeImage}>
                <h3>Remove image</h3>

                <div className="label-input">
                  <label htmlFor="id" className="form-label">
                    Image name
                  </label>
                  <input
                    id="id"
                    className="form-input"
                    type="text"
                    placeholder="enter image name"
                    onChange={onChangeImageId}
                    value={imageId}
                  />
                </div>
                <div>
                  <div>
                    <button type="submit" className="form-btn delete" disabled>
                      Delete image
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="options-container">
            <button
              type="button"
              name="comments"
              className="manage-btn"
              onClick={viewComments}
            >
              View comments or suggestions
            </button>
            {activeOption === "comments" && (
              <div>
                {comments.length > 0 ? (
                  <table>
                    <tbody>
                      {comments.map((comment) => (
                        <tr key={comment.id}>
                          <td className="table-row">{comment.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No comments or suggestions available now</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRoute;
