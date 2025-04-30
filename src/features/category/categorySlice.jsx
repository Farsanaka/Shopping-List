import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchAll(state) {},
    fetchAllSuccess(state, action) {
      console.log("within success", action.payload);
      state.categories = action.payload;
    },
    fetchAllFailure(state, action) {
      console.log("within failure", action.payload);
      state.error = `Error occurred - ${action.payload}`;
    },
  },
});

export const { fetchAllSuccess, fetchAllFailure } = categorySlice.actions;

export function fetchAll() {
  console.log("Entered function fetch all");
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:9001/category");
      console.log("Response is within category", response.data);
      const data = response.data;
      dispatch(fetchAllSuccess(data));
    } catch (err) {
      console.log("Dispatching error", err.message);
      dispatch(fetchAllFailure(err.message));
    }
  };
}

export default categorySlice.reducer;
