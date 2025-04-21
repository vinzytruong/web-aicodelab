import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { keycloak } from '../config/keycloak';

interface AuthContextType {
    authenticated: boolean;
    keycloak: Keycloak.KeycloakInstance | null;
    login: () => void;
    logout: () => void;
}
// Tạo context mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [keycloakInstance, setKeycloakInstance] = useState<Keycloak.KeycloakInstance | null>(null);

    useEffect(() => {
        keycloak
            .init({ onLoad: 'login-required' })
            .then((auth: any) => {
                setAuthenticated(auth);
                setKeycloakInstance(keycloak);
                if (auth) {
                    console.log('Access Token:', keycloak.token);
                }
            })
            .catch((err: any) => {
                console.error('Keycloak init error', err);
            });
    }, []);


    const login = () => {
        keycloak?.login();
    };

    const logout = () => {
        keycloak?.logout();
    };

    return (
        <AuthContext.Provider value={{ authenticated, keycloak: keycloakInstance, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng context
export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};