// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: '/', 
// });

// export default axiosInstance;


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/todo',
});

export default axiosInstance;
