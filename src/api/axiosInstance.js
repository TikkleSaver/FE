import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      config.headers = config.headers || {};
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoia2hzQG5hdmVyLmNvbSIsImlhdCI6MTc0NzkwMTA0MCwiZXhwIjoxNzUxNTAxMDQwfQ.4HisDBLXuaD4vxwVC5CjLBqosbSWactT6QnI4gLR3NI";
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
