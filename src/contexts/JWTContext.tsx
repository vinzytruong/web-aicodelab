

import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthContextType {
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
    isAuthenticated: () => boolean;
    register: (data: any) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
    login: async () => { },
    logout: () => { },
    isAuthenticated: () => true,
    register: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        try {
            console.log(username, password);
            navigate(`/admin/home`)
            return { success: true, message: "Logged in successfully" }
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error calling API server" }
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = "/login";
    };

    const isAuthenticated = () => {
        // Check authentication status
        return true
    };

    const register = async (data: any) => {
        try {
            return { success: true, message: "Register in successfully" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error calling API server" }
        }
    };

    return <AuthContext.Provider
        value={{
            login,
            logout,
            isAuthenticated,
            register,
        }}>
        {children}
    </AuthContext.Provider>;
};
