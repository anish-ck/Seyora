import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signIn: (email: string, otp: string) => Promise<void>;
    signUp: (email: string, otp: string) => Promise<void>;
    signOut: () => Promise<void>;
    googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
            const userData = await SecureStore.getItemAsync(USER_DATA_KEY);

            if (token && userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error checking auth state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, otp: string) => {
        try {
            // Mock API call - replace with actual authentication
            const response = await mockAuthAPI('signin', { email, otp });

            if (response.success && response.user && response.token) {
                const userData = {
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.name,
                };

                await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.token);
                await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));

                setUser(userData);
            } else {
                throw new Error(response.message || 'Sign in failed');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    };

    const signUp = async (email: string, otp: string) => {
        try {
            // Mock API call - replace with actual authentication
            const response = await mockAuthAPI('signup', { email, otp });

            if (response.success && response.user && response.token) {
                const userData = {
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.name,
                };

                await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.token);
                await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));

                setUser(userData);
            } else {
                throw new Error(response.message || 'Sign up failed');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    };

    const googleSignIn = async () => {
        try {
            // Mock Google OAuth - replace with actual implementation
            const response = await mockAuthAPI('google', {});

            if (response.success && response.user && response.token) {
                const userData = {
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.name,
                };

                await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.token);
                await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));

                setUser(userData);
            } else {
                throw new Error(response.message || 'Google sign in failed');
            }
        } catch (error) {
            console.error('Google sign in error:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_DATA_KEY);
            setUser(null);
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        googleSignIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Mock API function - replace with actual API calls
async function mockAuthAPI(type: 'signin' | 'signup' | 'google', data: any): Promise<{
    success: boolean;
    token?: string;
    user?: {
        id: string;
        email: string;
        name: string;
    }; 
    message?: string;
}> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock different scenarios for testing
    if (data.otp === '000000') {
        // Mock failure case
        return {
            success: false,
            message: 'Invalid OTP code',
        };
    }

    // Mock successful response
    return {
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
            id: 'user_' + Date.now(),
            email: data.email || 'user@example.com',
            name: 'John Doe',
        },
    };
}