import axios from "axios";
import { getCookie } from "./cookie";

const baseURL = "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = getCookie("token");

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
