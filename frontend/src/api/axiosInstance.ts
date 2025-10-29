import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // your backend URL
  withCredentials: true, // only if you're using cookies/JWT later
});

export default axiosInstance;
