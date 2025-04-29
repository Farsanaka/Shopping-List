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
    fetchAll(state) {
      // You can add loading state if needed, but in this case we're not using it
    },
    fetchAllSuccess(state, action) {
      console.log("within success", action.payload);
      state.categories = action.payload; // Update categories with fetched data
    },
    fetchAllFailure(state, action) {
      console.log("within failure", action.payload);
      state.error = `Error occurred - ${action.payload}`; // Update error message
    },
  },
});

export const { fetchAllSuccess, fetchAllFailure } = categorySlice.actions;

// Thunk function for fetching categories
export function fetchAllCategories() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:9001/categories"); // Update with actual API endpoint
      console.log("Response is", response.data);
      const data = response.data.categories; // Assuming API returns categories in 'categories' field
      dispatch(fetchAllSuccess(data)); // Dispatch success action with the fetched data
    } catch (err) {
      console.log("Dispatching error", err.message);
      dispatch(fetchAllFailure(err.message)); // Dispatch failure action with error message
    }
  };
}

export default categorySlice.reducer;
