import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser, isUserLoggedIn } from "../../services/auth";

const initialState = {
  user: isUserLoggedIn() ? getLoggedInUser() : null,
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
