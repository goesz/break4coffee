import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3333"
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Token expirado! Redirecionando para login...");
            localStorage.removeItem('token'); 
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);
