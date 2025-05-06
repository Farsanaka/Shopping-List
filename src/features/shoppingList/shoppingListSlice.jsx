// src/redux/shoppingListSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchShoppingLists, addShoppingListasync } from "../../services/api";
import axios from "axios";
const initialState = {
  shoppingLists: [],
  name: "",
  category: "",
  showItemInputs: false,
  error: "",
};

const shoppingListSlice = createSlice({
  name: "shoppingLists",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    showItemInputFields(state) {
      state.showItemInputs = true;
    },
    hideItemInputFields(state) {
      state.showItemInputs = false;
    },
    fetchAll(state, action) {},
    //state->current state
    //action->what to do
    //type->name of action
    //payload->data u r sending
    //dispatch->fn u call to send an actn to redux
    fetchAllSuccess(state, action) {
      console.log("Fetch success:", action.payload);
      state.shoppingLists = action.payload;
    },
    fetchAllFailure(state, action) {
      console.log("Fetch failure:", action.payload);
      state.error = `Error occurred - ${action.payload}`;
    },

    addShoppingList(state, action) {
      // state.shoppingLists.push(action.payload);
      // localStorage.setItem(
      //   "shoppingLists",
      //   JSON.stringify(state.shoppingLists)
      // );
    },
    addShoppingListSuccess(state, action) {
      state.shoppingLists.push(action.payload);
    },
    addShoppingListFailure(state, action) {
      state.error = action.payload;
    },
    deleteList(state, action) {},
    deleteListSuccess(state, action) {
      const deletedId = action.payload;
      state.shoppingLists = state.shoppingLists.filter(
        (list) => list.id !== deletedId
      );
    },

    deleteListFailure(state, action) {
      state.error = `Delete failed - ${action.payload}`;
    },
  },
});
export const {
  setName,
  setCategory,
  showItemInputFields,
  hideItemInputFields,
  fetchAllSuccess,
  fetchAllFailure,
  addShoppingListFailure,
  addShoppingListSuccess,
  deleteListSuccess,
  deleteListFailure,
} = shoppingListSlice.actions;

// Redux-compatible function
export function fetchAll(userId) {
  return async function (dispatch) {
    try {
      const allLists = await fetchShoppingLists();
      const filteredLists = allLists.filter((list) => list.userid === userId);
      dispatch({
        type: "shoppingLists/fetchAllSuccess",
        payload: filteredLists,
      });
    } catch (err) {
      console.log("Dispatching error:", err.message);
      dispatch({ type: "shoppingLists/fetchAllFailure", payload: err.message });
    }
  };
}
export function addShoppingList(newList) {
  return async function (dispatch) {
    console.log("entered addshopping list in slice");
    try {
      const response = await addShoppingListasync(newList);
      console.log("response is", response);
      if (response.status == 200) {
        dispatch(addShoppingListSuccess(newList));
      } else {
        dispatch(addShoppingListFailure("list could not be added"));
      }
      // const filteredLists = allLists.filter((list) => list.userid === userId);
      // dispatch({
      //   type: "shoppingLists/fetchAllSuccess",
      //   payload: filteredLists,
      // });
    } catch (err) {
      console.log("Dispatching error:", err.message);
      dispatch({ type: "shoppingLists/fetchAllFailure", payload: err.message });
    }
  };
}

export function deleteList(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:9000/lists/${id}`);
      dispatch(deleteListSuccess(id)); // Dispatch success with the id
    } catch (err) {
      dispatch(deleteListFailure(err.message)); // Dispatch failure with error message
    }
  };
}
export default shoppingListSlice.reducer;
