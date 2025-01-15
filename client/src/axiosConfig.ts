import axios from "axios";
import store from "@/store/store";
import { setCredentials, logOut } from "./store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_NODE_SERVER_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/api/v1/auth/refresh");
        store.dispatch(setCredentials({ accessToken: data.accessToken }));

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        store.dispatch(logOut());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
