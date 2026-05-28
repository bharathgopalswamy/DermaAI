import axios from "axios";

const API = axios.create({
  baseURL: "https://dermaai-yu8u.onrender.com",
});

export default API;