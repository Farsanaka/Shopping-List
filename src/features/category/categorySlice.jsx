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

    updateCategorySuccess(state, action) {
      const updated = action.payload;
      const index = state.categories.findIndex(
        (cat) => cat.code === updated.prevCode || cat.code === updated.code
      );
      if (index !== -1) {
        state.categories[index] = updated;
      }
    },

    updateCategoryFailure(state, action) {
      state.error = `Update failed - ${action.payload}`;
    },

    deleteCategorySuccess(state, action) {
      console.log("Category Deletion- success", action.payload);
      const deletedId = action.payload;
      state.categories = state.categories.filter((cat) => cat.id !== deletedId);
    },

    deleteCategoryFailure(state, action) {
      console.log("Category deletion- failed", action.payload);
      state.error = `Error occurred - ${action.payload}`;
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
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
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

export function updateCategory(updatedCategory) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        // `http://localhost:9001/category/${updatedCategory.prevcode}`,
        `http://localhost:9001/category/${updatedCategory.id}`,
        updatedCategory
      );
      dispatch(updateCategorySuccess(response.data));
      console.log("update");
    } catch (err) {
      dispatch(updateCategoryFailure(err.message));
    }
  };
}

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:9001/category/${id}`);
      dispatch(deleteCategorySuccess(id));
    } catch (err) {
      dispatch(deleteCategoryFailure(err.message));
    }
  };
}