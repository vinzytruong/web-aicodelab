// services/ai-assistant-service.ts
import axios from 'axios';

const DOCUMENT_API_URL = process.env.REACT_APP_DOCUMENT_HOST_API_URL;

const documentApi = axios.create({
    baseURL: `${DOCUMENT_API_URL}/api/`,
    timeout: 10000,
});

// Hàm cấu hình interceptor, truyền token từ bên ngoài
export const attachAuthInterceptor = (getToken: () => string | undefined) => {
    documentApi.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

export { documentApi };
