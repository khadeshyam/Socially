import { createContext, useState, useEffect } from "react";
import { makeRequest } from "../utils/axios";
import { auth, provider as googleProvider, popup } from "../utils/firebase";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const loggin = async (inputs) => {
    const res = await makeRequest.post('/auth/login', inputs);
    setCurrentUser(res.data);
    return res;
  }

  const logout = async () => {
    await makeRequest.post('/auth/logout');
    localStorage.removeItem("user");
    setCurrentUser(null);
  }

  const continueWithGoogle = async () => {
    try {
      const googleAuthRes = await popup(auth, googleProvider);
      const user = googleAuthRes.user;
      console.log(user);

      const userInfo = {
        username: user.displayName,
        email: user.email,
        name: user.displayName,
        profilePic: user.photoURL,
        fromGoogle: true
      };

      // Send user info to server
      const res = await makeRequest.post('/auth/google', userInfo);
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error);
      // handle error
    }
  };


  return (
    <AuthContext.Provider value={{ currentUser, loggin, continueWithGoogle,logout }}>
      {children}
    </AuthContext.Provider>
  )
}