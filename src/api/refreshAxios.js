// src/api/refreshAxios.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const refreshAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default refreshAxios;
