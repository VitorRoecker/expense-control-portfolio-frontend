import { ReactNode, createContext } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextProps {
    isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextProps);


export function AuthProvider({ children }: AuthProviderProps) {
    const isAuthenticated = false;

    async function signIn() {
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}