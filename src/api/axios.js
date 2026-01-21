import axios from "axios";
import { getToken } from "../auth/authService";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔥 ATTACH TOKEN TO EVERY REQUEST
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;


