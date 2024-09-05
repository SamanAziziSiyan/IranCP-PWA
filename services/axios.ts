import { toastAlert } from '@/utils';
import axios, { AxiosError, AxiosInstance } from 'axios';

const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('UserData');
        if (userData) {
            try {
                return JSON.parse(userData).token;
            } catch (error) {
                return null;
            }
        }
    }
    return null;
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://apiepayment.igame.market/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '9Ge*BO-Bzh~z@^?fHP;Eu~0rM7:jD`JZ00b[cs!0<!o$aLp=Mu'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError) => {
        if (error.code === 'ECONNABORTED') {
            toastAlert({ msg: 'زمان پردازش به پایان رسید، لطفا دوباره امتحان کنید.', type: 'error' });
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
