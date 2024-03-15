import { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem, removeItem } from "/src/services/localstorage.service";
import { useRouter } from "next/router";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const authorizedPages = [
        '/ui/sign-in',
        '/ui/sign-up'
    ];

    useEffect(() => {
        const token = getItem("token");
        if (token) {
            setToken(token);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        checkTokenValidity().then((validToken) => {
            if (!validToken && !loading && !authorizedPages.includes(router.pathname)){
                router.push('/ui/sign-in');
            }
        });
    }, [token,loading]);

    const checkTokenValidity = async () => {
        if (token) {
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                }),
            });

            const data = await response.json();

            if(response.ok){
                return true;
            }else{
                console.log(data.message)
                setToken(null);
                removeItem("token");
                return false;
            }
        }
        return false;
    }

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

        const data = await response.json();

        if(response.ok){
            setToken(data.token);
            setItem("token", data.token);
        }else{
            throw new Error(data.message);
        }

    };

    const logout = () => {
        setToken(null);
        removeItem("token");
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

        const data = await response.json();

        if(response.ok){
            setToken(data.token);
            setItem("token", data.token);
        }else {
            throw new Error(data.message);
        }
    }

    return (
        <AuthContext.Provider value={{ token, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}