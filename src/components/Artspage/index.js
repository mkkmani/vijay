import "./index.css";
import { useState, useEffect } from "react";

const apiStatusList = {
  init: "INIT",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ArtsPage = () => {
  const [gallery, setGallery] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusList.init);

  useEffect(() => {
    setApiStatus(apiStatusList.loading);
    const fetchImages = async () => {
      try {
        const api = "https://vijayarts.onrender.com/gallery";
        const options = {
          method: "GET",
        };
        const response = await fetch(api, options);
        const data = await response.json();
        const updateData = data.images.map((image) => ({
          id: image._id,
          name: image.name,
          link: image.imageUrl,
        }));
        setGallery(updateData);
        setApiStatus(apiStatusList.success);
      } catch (error) {
        setApiStatus(apiStatusList.failure);
      }
    };
    fetchImages();
  }, []);

  let content;
  switch (apiStatus) {
    case apiStatusList.loading:
      content = <h2>Loading arts...</h2>;
      break;
    case apiStatusList.success:
      content =
        gallery.length > 0 ? (
          <ul className="art-ul">
            {gallery.map((image) => (
              <li key={image.id}>
                <img
                  src={image.link}
                  className="gallery-image"
                  alt={image.name}
                />
              </li>
            ))}
          </ul>
        ) : (
          <h3>No images available now</h3>
        );
      break;
    case apiStatusList.failure:
      content = <h3>Data fetching failed. Please try again later.</h3>;
      break;
    default:
      content = null;
  }

  return (
    <div className="arts-container">
      <h1 className="arts-h1">Pencil Art Gallery</h1>
      {content}
    </div>
  );
};

export default ArtsPage;
