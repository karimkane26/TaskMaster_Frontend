import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://taskmaster-backend-r9a3.onrender.com/api/v1', // Remplacez par l'URL de votre backend Nest.js
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosClient;
