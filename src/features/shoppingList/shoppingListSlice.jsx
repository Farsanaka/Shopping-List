import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShoppingLists, addShoppingListasync } from "../../services/api";
import axios from "axios";

const initialState = {
  shoppingLists: JSON.parse(localStorage.getItem("shoppingLists")) || [],
  name: "",
  category: "",
  showItemInputs: false,
  currentList: {},
  status: "",
  error: "",
  showDetailsModal: false,
  selectedItem: null,
  checkedItems: {}, 
};

export const updateListStatus = createAsyncThunk(
  "shoppingLists/updateStatus",
  async ({ listId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:9000/list/${listId}`, { status });
      return { listId, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating list status");
    }
  }
);

export const saveCheckedItems = createAsyncThunk(
  "shoppingLists/saveCheckedItems",
  async ({ listId, checkedState }, { getState, rejectWithValue }) => {
    try {
      const list = getState().shoppingLists.shoppingLists.find(list => list.id === listId);
      const updatedItems = list.items.map((item, index) => ({
        ...item,
        checked: checkedState[index] || false,
      }));

      const response = await axios.patch(`http://localhost:9000/list/${listId}`, { items: updatedItems });
      return { listId, updatedItems, checkedState };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    fetchAllSuccess(state, action) {
      state.shoppingLists = action.payload;
    },
    fetchAllFailure(state, action) {
      state.error = `Error occurred - ${action.payload}`;
    },
    addShoppingListSuccess(state, action) {
      state.shoppingLists.push(action.payload);
    },
    addShoppingListFailure(state, action) {
      state.error = action.payload;
    },
    deleteListSuccess(state, action) {
      const deletedId = action.payload;
      state.shoppingLists = state.shoppingLists.filter(list => list.id !== deletedId);
    },
    deleteListFailure(state, action) {
      state.error = `Delete failed - ${action.payload}`;
    },

    openDetails(state, action) {
      const list = action.payload;
      state.showDetailsModal = true;
      // state.selectedItem = list;
      // 
      state.currentList = list;
      // 

      const listId = list.id;
      const stored = JSON.parse(localStorage.getItem("checkedItems")) || {};

      if (stored[listId]) {
        state.checkedItems[listId] = stored[listId];
      } else {
        const newChecked = {};
        list.items?.forEach((_, idx) => {
          newChecked[idx] = false;
        });
        state.checkedItems[listId] = newChecked;
      }
    },

    closeDetails(state) {
      state.showDetailsModal = false;
      // state.selectedItem = null;
      state.currentList = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateListStatus.fulfilled, (state, action) => {
        const { listId, status } = action.payload;
        const list = state.shoppingLists.find((list) => list.id === listId);
        if (list) {
          list.status = status;
          localStorage.setItem("shoppingLists", JSON.stringify(state.shoppingLists));
        }
      })
      .addCase(updateListStatus.rejected, (state, action) => {
        state.error = `Status update failed: ${action.payload}`;
      })
      .addCase(saveCheckedItems.fulfilled, (state, action) => {
        const { listId, updatedItems, checkedState } = action.payload;
        const list = state.shoppingLists.find((list) => list.id === listId);
        if (list) list.items = updatedItems;

        state.checkedItems[listId] = checkedState;

        const allChecked = Object.values(checkedState).every(Boolean);
        // if (state.selectedItem?.id === listId) {
        //   state.selectedItem.status = allChecked ? "Completed" : "Pending";
        // }

        //
        if (state.currentList?.id === listId) {
          state.currentList.status = allChecked ? "Completed" : "Pending";
        }        
        //  

        const saved = JSON.parse(localStorage.getItem("checkedItems")) || {};
        saved[listId] = checkedState;
        localStorage.setItem("checkedItems", JSON.stringify(saved));
      })
      .addCase(saveCheckedItems.rejected, (state, action) => {
        state.error = `Failed to save checked items: ${action.payload}`;
      });
  },
});

export const {
  setName,
  setCategory,
  showItemInputFields,
  hideItemInputFields,
  fetchAllSuccess,
  fetchAllFailure,
  addShoppingListSuccess,
  addShoppingListFailure,
  deleteListSuccess,
  deleteListFailure,
  openDetails,
  closeDetails,
} = shoppingListSlice.actions;

// === Thunks ===
export function fetchAll(userId) {
  return async function (dispatch) {
    try {
      const allLists = await fetchShoppingLists();
      const filteredLists = allLists.filter((list) => list.userid === userId);
      dispatch(fetchAllSuccess(filteredLists));
    } catch (err) {
      dispatch(fetchAllFailure(err.message));
    }
  };
}

export function addShoppingList(newList) {
  return async function (dispatch) {
    try {
      const response = await addShoppingListasync(newList);
      if (response.status === 200) {
        dispatch(addShoppingListSuccess(newList));
      } else {
        dispatch(addShoppingListFailure("List could not be added"));
      }
    } catch (err) {
      dispatch(fetchAllFailure(err.message));
    }
  };
}

export function deleteList(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:9000/list/${id}`);
      dispatch(deleteListSuccess(id));
    } catch (err) {
      dispatch(deleteListFailure(err.message));
    }
  };
}

export default shoppingListSlice.reducer;
