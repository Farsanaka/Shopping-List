export const loginUser = () => {
  localStorage.setItem("isLoggedIn", "true");
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("isLoggedIn");
  console.log("logout");
};

// Check login status
export const isUserLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
