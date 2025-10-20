// src/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000/users',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default client;
