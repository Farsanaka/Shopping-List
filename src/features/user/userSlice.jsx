import { createSlice } from "@reduxjs/toolkit";
import Auth from "../../services/auth";

const user = Auth.getLoggedInUser();


const initialState = {
  user: Auth.isUserLoggedIn() ? Auth.getLoggedInUser() : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
