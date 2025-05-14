import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: !!user,
  user: user || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending(state) {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    loginFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginPending, loginSuccess, loginFailure, logout } =
  authSlice.actions;


export const login =
  ({ username, password }) =>
  async (dispatch) => {
    dispatch(loginPending());
    try {
      const res = await axios.get("http://localhost:9000/users");

      if (res && res.data) {
        const user = res.data.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(loginSuccess(user));
        } else {
          dispatch(loginFailure("Invalid username or password"));
        }
      } else {
        dispatch(loginFailure("No data received from the server"));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

export const performLogout = () => (dispatch) => {
  dispatch(logout());
};

export default authSlice.reducer;
