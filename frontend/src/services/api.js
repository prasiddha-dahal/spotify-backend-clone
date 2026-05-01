import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", //url of backend
  withCredentials: true,   //frontend sends the token stored in cookie in each request
});

export default API;
