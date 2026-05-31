export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};