import axios, { AxiosInstance } from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export default api;
