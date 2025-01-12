// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // URL dasar untuk API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
