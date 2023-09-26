import { createContext, useState, useEffect } from "react";
import {makeRequest} from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const loggin = async (inputs) => {
            const res = await makeRequest.post('/auth/login',inputs);
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