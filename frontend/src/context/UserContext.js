import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        showToast,
        toastMessage
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;