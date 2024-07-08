import axios from 'axios';
import config from '../config.ts';

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        accept: 'application/json',
    },
});

export default axiosInstance;