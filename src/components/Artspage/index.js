import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const ArtsPage = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const api = "https://vijayarts.onrender.com/gallery/images";
      const options = {
        method: "GET",
      };
      const response = await fetch(api, options);
      const data = await response.json();
      const updateData = data.images.map((image) => ({
        id: image.id,
        name: image.name,
        link: image.image_link,
      }));
      setGallery(updateData);
    };
    fetchImages();
  });

  return (
    <div className="arts-container">
      <h1>Pencil Art Gallery</h1>
      {gallery.length > 0 && (
        <ul className="art-ul">
          {gallery.map((image) => (
            <li key={uuidv4()}>
              <img
                src={image.link}
                className="gallery-image"
                alt={image.name}
              />
            </li>
          ))}
        </ul>
      )}
      {gallery.length === 0 && <h3>No images available now</h3>}
    </div>
  );
};

export default ArtsPage;
