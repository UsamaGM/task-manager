import axios from "axios";

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

export default api;
