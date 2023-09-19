import axios from 'axios';

const api = axios.create({
    baseURL: 'https://academics.newtonschool.co/api/v1/ott',
    headers: {
        projectId: import.meta.env.VITE_PROJECT_ID,
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token_zee5');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

