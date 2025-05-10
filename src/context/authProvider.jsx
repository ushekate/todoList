'use client';
import { useContext, createContext, useState, useEffect, children } from "react";
import { client } from "@/utils/pocketbase";
import { useRouter } from "next/navigation";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email, password, role) => {
        setLoading(true);
        try {
            console.log(role);
            await client.collection(role ==='user'? 'users' : 'admin').authWithPassword(email, password);
            const userLoged = client.authStore.model;
            console.log('login', userLoged);

            localStorage.setItem('user', userLoged);
            setUser(userLoged);
            setLoading(false);
            if(role === 'admin'){
                console.log('Hello');
                setIsAdmin(true);
                router.push('/admin');
            } else if(role === 'user') {
                router.push('/todo');
                // router.push('/login');
            }
        } catch (err) {
            alert('Login failed: Invalid email or password.');
            setLoading(false)
        }
    };

    useEffect(() => {
        console.log('user', user);
        if (!user && !loading) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser);
                // router.push('/login');
            } else {
                router.push('/login');
            }
        } else if (user && isAdmin) {
            router.push('/admin');
        } else if (user && !isAdmin) {
            router.push('/todo');
        }

    }, [user, loading]);


    return (
        <AuthContext.Provider value={{ handleLogin, user, isAdmin }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};