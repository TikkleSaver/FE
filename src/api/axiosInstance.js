import axios from 'axios';
import { refreshAccessToken } from './tokenApi';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      config.headers = config.headers || {};
      //로그인 페이지로 넘어가는 등의 처리가 있어야 할 듯
    }

    // 👇 FormData일 경우 Content-Type 제거 → 브라우저가 자동으로 설정
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401일 경우 토큰 재발급 + 요청 재시도

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // 조건: 응답이 401이고, 중복 요청 방지 플래그 없을 때만
    if (!response || response.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(config); // 원래 요청 다시 시도
    } catch (refreshError) {
      console.error('토큰 재발급 실패:', refreshError);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
    }
  }
);
export default axiosInstance;
