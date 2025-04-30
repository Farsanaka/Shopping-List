import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  error: "",
  code: "",
  category: "",
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
    addCategorySuccess(state, action) {
      console.log("Category added ", action.payload);
      state.categories.push(action.payload);
    },
    addCategoryFailure(state, action) {
      console.log("Category added- failed", action.payload);
      state.error = `Error occurred - ${action.payload}`;
      state.category = "";
      state.code = "";
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const {
  fetchAllSuccess,
  fetchAllFailure,
  addCategorySuccess,
  addCategoryFailure,
  setCode,
  setCategory,
} = categorySlice.actions;

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
export function addCategory(newCategory) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:9001/category",
        newCategory
      );
      dispatch(addCategorySuccess(response.data));
    } catch (err) {
      dispatch(addCategoryFailure(err.message));
    }
  };
}
