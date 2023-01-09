import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const getUser = () => {
  //   return user;
  // };

  const deleteUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ setUser, user, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
