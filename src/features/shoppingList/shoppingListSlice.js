// src/redux/shoppingListSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchShoppingLists } from "../../services/api";

const initialState = {
  lists: [], //to store filltered shopping list-current user
  error: "", //to store error msg- during fetch
};

const shoppingListSlice = createSlice({
  name: "shoppingLists",
  initialState,
  reducers: {
    fetchAll(state, action) {},
    //state->current state
    //action->what to do
    //type->name of action
    //payload->data u r sending
    // dispatch->fn u call to send an actn to redux
    fetchAllSuccess(state, action) {
      console.log("Fetch success:", action.payload);
      state.lists = action.payload;
    },
    fetchAllFailure(state, action) {
      console.log("Fetch failure:", action.payload);
      state.error = `Error occurred - ${action.payload}`;
    },
  },
});

export const { fetchAllSuccess, fetchAllFailure } = shoppingListSlice.actions;
// Redux-compatible function that handles side effects like API calls.
export function fetchAll(userId) {
  return async function (dispatch) {
    try {
      const allLists = await fetchShoppingLists();
      const filteredLists = allLists.filter((list) => list.userid === userId);
      dispatch({
        //shopping list<-redux state where this actn will be applied
        //fetchallsuccess<-specific actn that trigger fetchallsuccedd reducer
        type: "shoppingLists/fetchAllSuccess",
        //payload<- actual content -want to store
        payload: filteredLists,
      });
    } catch (err) {
      console.log("Dispatching error:", err.message);
      dispatch({ type: "shoppingLists/fetchAllFailure", payload: err.message });
    }
  };
}

export default shoppingListSlice.reducer;
