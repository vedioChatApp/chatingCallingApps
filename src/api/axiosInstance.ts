import axios from 'axios';

const BASE_URL = 'https://api.joyntapp.com'; // ✅ बेस URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
