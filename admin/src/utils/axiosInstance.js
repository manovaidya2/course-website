import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5005/api/", // ← YOUR BACKEND URL
  // baseURL: "https://apicourse.manovaidya.com/api/",
});

// FormData handling
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

export default axiosInstance;
