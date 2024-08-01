import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/todo',
});

export default axiosInstance;
