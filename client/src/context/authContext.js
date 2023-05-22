import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const loggin = async (inputs) => {
            const res = await axios.post("http://localhost:5000/api/auth/login",inputs,{withCredentials:true});
            setCurrentUser(res.data);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, loggin }}>
            {children}
        </AuthContext.Provider>
    )
}