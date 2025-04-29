export const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  console.log("logout");
};

// Check login status
export const isUserLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
