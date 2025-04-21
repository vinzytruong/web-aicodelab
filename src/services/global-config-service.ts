// services/ai-assistant-service.ts
import axios from 'axios';

const AI_ASSISTANT_API_URL = process.env.REACT_APP_AI_ASSISTANT_HOST_API_URL;

const aiAssistantApi = axios.create({
    baseURL: AI_ASSISTANT_API_URL,
    timeout: 10000,
});

// Hàm cấu hình interceptor, truyền token từ bên ngoài
export const attachAuthInterceptor = (getToken: () => string | undefined) => {
    aiAssistantApi.interceptors.request.use(
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

export { aiAssistantApi };
