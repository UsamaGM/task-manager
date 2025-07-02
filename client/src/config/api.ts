import axios from "axios";
import { getCookie } from "./cookie";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "https://api.example.com"
  : "http://localhost:3000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
