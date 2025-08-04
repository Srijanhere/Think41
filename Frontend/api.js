import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
  withCredentials: true, // needed if using cookies/auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
