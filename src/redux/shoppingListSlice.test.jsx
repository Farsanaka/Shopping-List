import reducer, {
  showItemInputFields,
  hideItemInputFields,
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
} from "../redux/shoppingListSlice";

describe("shoppingListSlice Reducer Detailed Tests", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      shoppingLists: [],
      currentList: null,
      showItemInputs: false,
      error: "",
    };
  });

  it("should return the initial state when action is unknown", () => {
    const action = { type: "unknown" };
    const newState = reducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  it("should set showItemInputs to true on showItemInputFields", () => {
    const action = showItemInputFields();
    const newState = reducer(initialState, action);
    expect(newState.showItemInputs).toBe(true);
    expect(newState).toEqual({
      ...initialState,
      showItemInputs: true,
    });
  });

  it("should set showItemInputs to false on hideItemInputFields", () => {
    initialState.showItemInputs = true;
    const action = hideItemInputFields();
    const newState = reducer(initialState, action);
    expect(newState.showItemInputs).toBe(false);
  });

  it("should populate shoppingLists on fetchAllSuccess", () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const action = fetchAllSuccess(payload);
    const newState = reducer(initialState, action);
    expect(newState.shoppingLists).toEqual(payload);
  });

  it("should set error string correctly on fetchAllFailure", () => {
    const error = "Fetch failed";
    const action = fetchAllFailure(error);
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("Error occurred - Fetch failed");
  });

  it("should add a new list to shoppingLists on addShoppingListSuccess", () => {
    const newList = { id: 3, name: "Bakery" };
    const action = addShoppingListSuccess(newList);
    const newState = reducer(initialState, action);
    expect(newState.shoppingLists).toHaveLength(1);
    expect(newState.shoppingLists[0]).toEqual(newList);
  });

  it("should update error on addShoppingListFailure", () => {
    const error = "Add failed";
    const action = addShoppingListFailure(error);
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("Add failed");
  });

  it("should remove list with matching ID on deleteListSuccess", () => {
    initialState.shoppingLists = [
      { id: 1, name: "List A" },
      { id: 2, name: "List B" },
    ];
    const action = deleteListSuccess(1);
    const newState = reducer(initialState, action);
    expect(newState.shoppingLists).toEqual([{ id: 2, name: "List B" }]);
  });

  it("should not delete anything if no matching ID is found", () => {
    initialState.shoppingLists = [{ id: 5 }];
    const action = deleteListSuccess(999);
    const newState = reducer(initialState, action);
    expect(newState.shoppingLists).toEqual([{ id: 5 }]);
  });

  it("should set error on deleteListFailure", () => {
    const action = deleteListFailure("DeleteError");
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("Delete failed - DeleteError");
  });

  it("should update list status correctly on updateListStatusSuccess", () => {
    initialState.shoppingLists = [
      { id: 1, name: "Old", status: "pending" },
      { id: 2, name: "New", status: "pending" },
    ];
    const payload = { listId: 2, status: "done" };
    const action = updateListStatusSuccess(payload);
    const newState = reducer(initialState, action);
    const updated = newState.shoppingLists.find((l) => l.id === 2);
    expect(updated.status).toBe("done");
  });

  it("should not throw or change anything if no list matches updateListStatusSuccess", () => {
    initialState.shoppingLists = [{ id: 1, status: "pending" }];
    const action = updateListStatusSuccess({ listId: 99, status: "done" });
    const newState = reducer(initialState, action);
    expect(newState.shoppingLists[0].status).toBe("pending");
  });

  it("should set error on updateListStatusFailure", () => {
    const error = "Server error";
    const action = updateListStatusFailure(error);
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("Status update failed: Server error");
  });

  it("should set currentList on fetchListByIdSuccess", () => {
    const list = { id: 88, name: "Special" };
    const action = fetchListByIdSuccess(list);
    const newState = reducer(initialState, action);
    expect(newState.currentList).toEqual(list);
  });

  it("should set error string on fetchListByIdFailure", () => {
    const error = "No list found";
    const action = fetchListByIdFailure(error);
    const newState = reducer(initialState, action);
    expect(newState.error).toBe("No list found");
  });
});
