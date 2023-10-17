import { createContext,useState,useEffect,useCallback} from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) =>{
    const [darkMode,setDarkMode] = useState( 
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    const toggle = useCallback(() =>{
        setDarkMode(!darkMode);
    },[darkMode])

    useEffect(() => {
        localStorage.setItem("darkMode",darkMode);

    },[darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggle}}>
             {children}
        </DarkModeContext.Provider>
    );
};