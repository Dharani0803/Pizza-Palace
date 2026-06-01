import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("user")) || null;
  });
  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;