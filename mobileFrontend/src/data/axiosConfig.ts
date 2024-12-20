import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
   async (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      Promise.reject(error);
   }
);

export default api;
