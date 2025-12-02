import axios from "axios";

export const API3 = axios.create({
  baseURL: "https://faq-crud.onrender.com/api",
});

export const API_DUMMY = axios.create({
  baseURL: "https://dummyjson.com/",
});

API_DUMMY.interceptors.request.use((config) => {
  const token = localStorage.getItem("acces_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
