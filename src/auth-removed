import axios from "axios";

const AUTH_KEY = "isAuthenticated";
const USER_KEY = "user";

const Auth = {
  isAuthenticated: localStorage.getItem(AUTH_KEY) === "true",

  async login(email, password) {
    try {
      const response = await axios.get(
        `http://localhost:9000/users?email=${email}`
      );
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        this.loginUser(user); // Use internal method
        alert("Login successful");
        return user;
      } else {
        alert("Invalid email or password");
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  loginUser(user) {
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isAuthenticated = true;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    this.isAuthenticated = false;
    console.log("Logged out");
  },

  isUserLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "true";
  },

  getLoggedInUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
};

export default Auth;
