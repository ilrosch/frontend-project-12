import axios from "axios";

const api = axios.create({});

const getToken = () => localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')).token
  : null;

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
