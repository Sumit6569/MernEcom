// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mernecom-pgkp.onrender.com/api/v1", // Your backend API base URL
});

export default instance;
