import axios from 'axios';

//const API_BASE_URL = 'http://127.0.0.1:5000' || 'http://localhost:5000';
const API_BASE_URL =  "http://127.0.0.1:5000";
console.log("Connecting to:", API_BASE_URL);

const api = axios.create({
  
  baseURL: API_BASE_URL,

  timeout: 10000, 
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;