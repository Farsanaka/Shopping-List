export const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  console.log("logout");
};

export const isUserLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
