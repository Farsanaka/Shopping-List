import reducer, {
  fetchAllSuccess,
  fetchAllFailure,
  addShoppingListSuccess,
  addShoppingListFailure,
  deleteListSuccess,
  deleteListFailure,
  updateListStatusSuccess,
  updateListStatusFailure,
  fetchListByIdSuccess,
  fetchListByIdFailure,
  showItemInputFields,
  hideItemInputFields,
} from "./shoppingListSlice"; // Thunks not tested directly in this reducer suite

describe("shoppingListSlice reducer", () => {
  const initialState = {
    shoppingLists: [],
    currentList: null,
    showItemInputs: false,
    error: "",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle showItemInputFields", () => {
    const state = reducer(initialState, showItemInputFields());
    expect(state.showItemInputs).toBe(true);
  });

  it("should handle hideItemInputFields", () => {
    const modifiedState = { ...initialState, showItemInputs: true };
    const state = reducer(modifiedState, hideItemInputFields());
    expect(state.showItemInputs).toBe(false);
  });

  it("should handle fetchAllSuccess", () => {
    const lists = [{ id: 1, name: "Groceries" }];
    const state = reducer(initialState, fetchAllSuccess(lists));
    expect(state.shoppingLists).toEqual(lists);
  });

  it("should handle fetchAllFailure", () => {
    const error = "Network error";
    const state = reducer(initialState, fetchAllFailure(error));
    expect(state.error).toBe("Error occurred - Network error");
  });

  it("should handle addShoppingListSuccess", () => {
    const newList = { id: 2, name: "Books" };
    const state = reducer(initialState, addShoppingListSuccess(newList));
    expect(state.shoppingLists).toContainEqual(newList);
  });

  it("should handle addShoppingListFailure", () => {
    const state = reducer(initialState, addShoppingListFailure("Add failed"));
    expect(state.error).toBe("Add failed");
  });

  it("should handle deleteListSuccess", () => {
    const prevState = {
      ...initialState,
      shoppingLists: [
        { id: 1, name: "Test" },
        { id: 2, name: "Another" },
      ],
    };
    const state = reducer(prevState, deleteListSuccess(1));
    expect(state.shoppingLists).toEqual([{ id: 2, name: "Another" }]);
  });

  it("should handle deleteListFailure", () => {
    const state = reducer(initialState, deleteListFailure("Failed delete"));
    expect(state.error).toBe("Delete failed - Failed delete");
  });

  it("should handle updateListStatusSuccess", () => {
    const prevState = {
      ...initialState,
      shoppingLists: [{ id: 1, name: "Test", status: "open" }],
    };
    const state = reducer(
      prevState,
      updateListStatusSuccess({ listId: 1, status: "closed" })
    );
    expect(state.shoppingLists[0].status).toBe("closed");
  });

  it("should handle updateListStatusFailure", () => {
    const state = reducer(
      initialState,
      updateListStatusFailure("Update failed")
    );
    expect(state.error).toBe("Status update failed: Update failed");
  });

  it("should handle fetchListByIdSuccess", () => {
    const list = { id: 5, name: "Fetched List" };
    const state = reducer(initialState, fetchListByIdSuccess(list));
    expect(state.currentList).toEqual(list);
  });

  it("should handle fetchListByIdFailure", () => {
    const state = reducer(initialState, fetchListByIdFailure("Not found"));
    expect(state.error).toBe("Not found");
  });

  it("should return unchanged state for unknown action", () => {
    const state = reducer(initialState, { type: "UNKNOWN_ACTION" });
    expect(state).toEqual(initialState);
  });
});
