import {createContext, useContext, useEffect, useState} from 'react';
import { getItem, setItem, removeItem } from "/src/services/localstorage.service";
import { useRouter } from "next/router";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            setUser(user);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!user && !loading) {
            router.push('/ui/sign-in');
        }
    }, [user,loading]);

    const login = async (infos) => {

        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: infos.email,
                password: infos.password
            }),
        });

        if(response.ok){
            const data = await response.json();
            setUser(data);
            setItem("user", data);
        }

    };

    const logout = () => {
        setUser(null);
        removeItem("user");
    };

    const register = async (infos) => {
        const response = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:infos.email,
                password:infos.password,
                firstName:infos.firstName,
                lastName:infos.lastName
            }),
        });

        if(response.ok){
            const data = await response.json();
            setUser(data);
            setItem("user", data);
        }

    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}