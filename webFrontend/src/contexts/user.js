"use client"
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userService = new UserService();

  useEffect(() => {
      userService.getUser()
         .then((response) => {
            setUser(response.data.user)
            console.log(response.data)
         }).catch((error) => {
            console.log(error)
         })
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
