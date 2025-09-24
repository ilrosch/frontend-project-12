import axios from "axios";
import './socket';
import { selectCurrentToken } from "../services/slices/authSlice";
import store from "../services/store";

const api = axios.create({});

api.interceptors.request.use(
  (config) => {
    const token = selectCurrentToken(store.getState());
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
