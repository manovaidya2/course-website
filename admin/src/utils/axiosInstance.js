import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5005/api",
   baseURL: "https://apicourse.manovaidya.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
