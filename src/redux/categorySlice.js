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
    fetchAllSuccess(state, action) {
      state.categories = action.payload;
    },

    fetchAllFailure(state, action) {
      state.error = `Error occurred - ${action.payload}`;
    },

    addCategorySuccess(state, action) {
      state.categories.push(action.payload);
    },

    addCategoryFailure(state, action) {
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
      const index = state.categories.findIndex((cat) => cat.id === updated.id);
      if (index !== -1) {
        state.categories[index] = updated;
      }
    },

    updateCategoryFailure(state, action) {
      state.error = `Update failed - ${action.payload}`;
    },
    deleteCategory(state, action) {},
    deleteCategorySuccess(state, action) {
      const deletedId = action.payload;
      state.categories = state.categories.filter((cat) => cat.id !== deletedId);
    },
    deleteCategoryFailure(state, action) {
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

export function fetchAll(userId) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:9000/categories?userId=${userId}`
      );
      const data = response.data;
      dispatch(fetchAllSuccess(data));
    } catch (err) {
      dispatch(fetchAllFailure(err.message));
    }
  };
}

//

export default categorySlice.reducer;

export function addCategory(newCategory) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:9000/categories",
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
        `http://localhost:9000/categories/${updatedCategory.id}`,
        updatedCategory
      );
      dispatch(updateCategorySuccess(response.data));
    } catch (err) {
      dispatch(updateCategoryFailure(err.message));
    }
  };
}

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:9000/categories/${id}`);
      dispatch(deleteCategorySuccess(id));
    } catch (err) {
      dispatch(deleteCategoryFailure(err.message));
    }
  };
}
