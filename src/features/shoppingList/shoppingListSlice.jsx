import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShoppingLists, addShoppingListasync } from "../../services/api";
import axios from "axios";
const initialState = {
  shoppingLists: [],
  name: "",
  currentList: null,
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

    addShoppingList(state, action) {},
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
    updateListStatus(state, action) {},
    updateListStatusSuccess(state, action) {
      const { listId, status } = action.payload;
      const list = state.shoppingLists.find((list) => list.id === listId);
      if (list) {
        list.status = status; 
      }
    },

    updateListStatusFailure(state, action) {
      state.error = `Status update failed: ${action.payload}`;
    },
    fetchListById(state, action) {},
    fetchListByIdSuccess(state, action) {
      state.currentList = action.payload;
    },
    fetchListByIdFailure(state, action) {
      state.error = action.payload;
    },
  },
});

extraReducers: (builder) => {
  builder
    .addCase(updateListStatus.fulfilled, (state, action) => {
      const { listId, status } = action.payload;
      const list = state.shoppingLists.find((list) => list.id === listId);
      if (list) {
        list.status = status;
      }
      if (state.currentList?.id === listId) {
        state.currentList.status = status;
      }
    })
    .addCase(updateItemsCompletedStatus.fulfilled, (state, action) => {
      const updatedItems = action.payload.items;
      if (state.currentList) {
        state.currentList.items = updatedItems;
      }
    });
};

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
  updateListStatusSuccess,
  updateListStatusFailure,
  fetchListByIdSuccess,
  fetchListByIdFailure,
} = shoppingListSlice.actions;

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
    } catch (err) {
      console.log("Dispatching error:", err.message);
      dispatch({ type: "shoppingLists/fetchAllFailure", payload: err.message });
    }
  };
}

export function deleteList(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:9000/list/${id}`);
      dispatch(deleteListSuccess(id));
    } catch (err) {
      console.log("Delete Error:", err.message);
      dispatch(deleteListFailure(err.message));
    }
  };
}
export const updateListStatus = createAsyncThunk(
  "shoppingList/updateStatus",
  async ({ listId, status, category }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:9000/list/${listId}`,
        { status, category }
      );
      return { listId, status: response.data.status }; 
    } catch (error) {
      console.error("Update Status Error:", error);
      return rejectWithValue(error.response?.data || "Error updating status");
    }
  }
);

export function fetchListById(id) {
  return async function (dispatch) {
    try {
      console.log("Fetching list by ID:", id);

      const response = await axios.get(`http://localhost:9000/list/${id}`);
      dispatch(fetchListByIdSuccess(response.data));
      console.log("fetchlistbyid:", response.data);
    } catch (err) {
      console.log("Fetch Error:", err.message);
      dispatch(fetchListByIdFailure(err.message));
    }
  };
}

export const updateItemsCompletedStatus = createAsyncThunk(
  "shoppingList/updateItemsCompletedStatus",
  async ({ listId, items }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:9000/list/${listId}`,
        { items }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update items");
    }
  }
);

export const toggleItemCompletion = createAsyncThunk(
  "shoppingList/toggleItemCompletion",
  async ({ listId, items }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:9000/list/${listId}`,
        {
          items,
        }
      );
      return { listId, items: response.data.items };
    } catch (error) {
      console.error("Toggle Item Completion Error:", error);
      return rejectWithValue("Could not update item completion");
    }
  }
);

export default shoppingListSlice.reducer;
