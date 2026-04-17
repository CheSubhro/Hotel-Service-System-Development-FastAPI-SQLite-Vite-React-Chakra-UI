
import axios from 'axios';

// Create an instance of axios pointing to your FastAPI backend
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Backend URL
});

export default api;