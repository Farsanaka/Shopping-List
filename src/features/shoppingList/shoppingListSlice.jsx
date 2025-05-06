// // src/redux/shoppingListSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchShoppingLists } from "../../services/api";

// const initialState = {
//   lists: [], //to store filltered shopping list-current user
//   name: "",
//   category: "",
//   showItemInputs: false,
//   error: "", //to store error msg- during fetch
// };

// const shoppingListSlice = createSlice({
//   name: "shoppingLists",
//   initialState,
//   reducers: {
//     setName(state, action) {
//       state.name = action.payload;
//     },
//     setCategory(state, action) {
//       state.category = action.payload;
//     },
//     showItemInputFields(state) {
//       state.showItemInputs = true;
//     },
//     hideItemInputFields(state) {
//       state.showItemInputs = false;
//     },
//     fetchAll(state, action) {},
//     //state->current state
//     //action->what to do
//     //type->name of action
//     //payload->data u r sending
//     //dispatch->fn u call to send an actn to redux
//     fetchAllSuccess(state, action) {
//       console.log("Fetch success:", action.payload);
//       state.lists = action.payload;
//     },
//     fetchAllFailure(state, action) {
//       console.log("Fetch failure:", action.payload);
//       state.error = `Error occurred - ${action.payload}`;
//     },
//   },
// });
// export const {
//   setName,
//   setCategory,
//   showItemInputFields,
//   hideItemInputFields,
//   fetchAllSuccess,
//   fetchAllFailure,
// } = shoppingListSlice.actions;

// // Redux-compatible function that handles side effects like API calls.
// export function fetchAll(userId) {
//   return async function (dispatch) {
//     try {
//       const allLists = await fetchShoppingLists();
//       const filteredLists = allLists.filter((list) => list.userid === userId);
//       dispatch({
//         //shopping list<-redux state where this actn will be applied
//         //fetchallsuccess<-specific actn that trigger fetchallsuccedd reducer
//         type: "shoppingLists/fetchAllSuccess",
//         //payload<- actual content -want to store
//         payload: filteredLists,
//       });
//     } catch (err) {
//       console.log("Dispatching error:", err.message);
//       dispatch({ type: "shoppingLists/fetchAllFailure", payload: err.message });
//     }
//   };
// }

// export default shoppingListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchShoppingLists } from "../../services/api";
import axios from "axios";
const initialState = {
  lists: [], //to store filltered shopping list-current user
  name: "",
  category: "",
  item: "",
  qty: "",
  showItemInputs: false,
  error: "", //to store error msg- during fetch
};

// const listSlice = createSlice({
//   name: "list",
//   initialState,
//   reducers: {
//     setName(state, action) {
//       state.name = action.payload;
//     },
//     setCategory(state, action) {
//       state.category = action.payload;
//     },
//     showItemInputFields(state) {
//       state.showItemInputs = true;
//     },
//     hideItemInputFields(state) {
//       state.showItemInputs = false;
//     },
//   },
// });

// export const {
//   setName,
//   setCategory,
//   showItemInputFields,
//   hideItemInputFields,
// } = listSlice.actions;

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
    setItem(state, action) {
      state.item = action.payload;
    },
    setQty(state, action) {
      state.qty = action.payload;
    },

    fetchAll(state, action) {},
    //state->current state
    //action->what to do
    //type->name of action
    //payload->data u r sending
    //dispatch->fn u call to send an actn to redux
    fetchAllSuccess(state, action) {
      console.log("Fetch success:", action.payload);
      state.lists = action.payload;
    },
    fetchAllFailure(state, action) {
      console.log("Fetch failure:", action.payload);
      state.error = `Error occurred - ${action.payload}`;
    },
    //////////
    createNewListSuccess(state, action) {
      state.lists.push(action.payload);
    },
    /////
    showItemInputFields(state) {
      state.showItemInputs = true;
    },
    hideItemInputFields(state) {
       state.showItemInputs = false;
    },
    addItemSuccess(state, action) {
      const { name, category, lists, item, qty } = action.payload;

      const list = lists.find(
        (l) => l.name === name && l.category === category
      );
      if (list) {
        list.items = list.items || [];
        list.items.push({ item, qty });
      }
      state.item = "";
      state.qty = "";
    },

    addItemFailure(state, action) {
      state.error = action.payload;
    },
    createNewList: (state, action) => {
      const { name, category, userid } = action.payload;
      const newList = {
        id: Date.now(),

        name,
        category,
        status: "Pending",
        items: [],
        userid,
      };
      state.lists.push(newList);
    },
  },
});
export const {
  setName,
  setCategory,
  setItem,
  setQty,
  showItemInputFields,
  hideItemInputFields,
  fetchAllSuccess,
  fetchAllFailure,
  addItemFailure,
  addItemSuccess,
  createNewListSuccess,
} = shoppingListSlice.actions;

// Redux-compatible function
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
// adding item in list page
export function addItem({ listId, item, qty }) {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const list = state.shoppingLists.lists.find((l) => l.id === listId);
      if (!list) throw new Error("List not found");

      const updatedItems = [...(list.items || []), { item, qty }];

      await axios.patch(`http://localhost:9000/list/${listId}`, {
        items: updatedItems,
      });
      dispatch(
        addItemSuccess({
          listId,
          item,
          qty,
        })
      );
      // dispatch(addItemSuccess({ listId, item, qty }));
    } catch (err) {
      dispatch(addItemFailure(err.message));
    }
  };
}
// addItemSuccess(state, action) {
//   const { listId, item, qty } = action.payload;
//   const list = state.lists.find((l) => l.id === listId);
//   if (list) {
//     list.items = list.items || [];
//     list.items.push({ item, qty });
//   }
//   // Reset item input fields
//   state.item = "";
//   state.qty = "";
// }

////////
// export function createNewList({ name, category, userid }) {
//   return async function (dispatch) {
//     try {
//       const response = await axios.post("http://localhost:9000/list", {
//         name,
//         category,
//         status: "Pending",
//         date: new Date().toLocaleDateString("en-GB"),
//         items: [],
//         userid,
//       });

//       dispatch(fetchAllSuccess([response.data])); // add to current state (optional)
//     } catch (err) {
//       dispatch(fetchAllFailure(err.message));
//     }
//   };
// }
///////////

export function createNewList({ name, category, userid }) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:9000/list", {
        name,
        category,
        status: "Pending",
        date: new Date().toLocaleDateString("en-GB"),
        items: [],
        userid,
      });

      dispatch(fetchAllSuccess([...response.data])); // Keep all lists
      dispatch(showItemInputFields()); // Make inputs appear
    } catch (err) {
      dispatch(fetchAllFailure(err.message));
    }
  };
}

export default shoppingListSlice.reducer;
