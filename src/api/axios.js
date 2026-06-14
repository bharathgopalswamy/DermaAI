import axios from "axios";

const API = axios.create({
 baseURL: "https://dermaai-yu8u.onrender.com/api",
});

export default API;