// src/axiosConfig.js

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default axios;
export { setAuthToken };
