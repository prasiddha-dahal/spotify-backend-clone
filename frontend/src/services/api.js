import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //url of backend
  withCredentials: true,   //frontend sends the token stored in cookie in each request
});

export default API;
