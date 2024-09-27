import axios from 'axios';

const axiosInstanceSeller = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // withCredentials: true,
});

// Add a request interceptor to include the token in headers
axiosInstanceSeller.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('sellerAuthToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstanceSeller;