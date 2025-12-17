// // utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // 🧠 Automatically set correct headers for FormData
// axiosInstance.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     config.headers["Content-Type"] = "multipart/form-data";
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apicourse.manovaidya.com/api", // ✔ apna backend URL
});

// 🔥 ALWAYS attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// 🔥 Response interceptor (without auto logout)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Removed automatic logout on 401
    return Promise.reject(error);
  }
);

export default axiosInstance;
