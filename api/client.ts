import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com/products",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("Request made with ", config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);
export default apiClient;
