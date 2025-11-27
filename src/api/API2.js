import axios from "axios";

const API2 = axios.create({
  baseURL: "https://faq-crud.onrender.com/api",
});

export default API2;
