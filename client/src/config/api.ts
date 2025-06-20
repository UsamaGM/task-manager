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

const token = getCookie("token");
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;
