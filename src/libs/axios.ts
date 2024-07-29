// src/libs/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/', // Next.js API routes are prefixed with `/api`
});

export default axiosInstance;
