import axios from 'axios';

const AdminAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor to include the token in headers
AdminAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AdminAuthToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AdminAxiosInstance;