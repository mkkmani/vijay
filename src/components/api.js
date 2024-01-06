const baseURL = process.env.REACT_APP_API_URL;

const api = {
  adminLogin: `${baseURL}/admin/login`,
  addToGallery: `${baseURL}/admin/gallery/add`,
};

export default api;
