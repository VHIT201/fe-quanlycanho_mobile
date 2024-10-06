// src/config/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:5170/api/v1/', // Đặt URL gốc cho API
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Bạn có thể thêm các interceptor ở đây nếu cần

export default instance;
