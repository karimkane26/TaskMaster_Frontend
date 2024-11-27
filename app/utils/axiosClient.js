import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/api/v1/', // Remplacez par l'URL de votre backend Nest.js
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
