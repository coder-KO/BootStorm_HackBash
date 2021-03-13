import axios from "axios";
// import { api } from "../config";

const token = window.localStorage.getItem("auth-token");

const axiosIntance = axios.create({
  baseURL: "http://localhost:5000/users",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  // const { auth } = store.getState();
  const token = window.localStorage.getItem("auth-token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export default axiosIntance;
