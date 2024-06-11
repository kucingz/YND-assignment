import axios, { AxiosInstance } from 'axios';
const BASE_URL = 'https://api.github.com/';
//poprawic to dodac env
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
