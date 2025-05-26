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
  addShoppingList,
  deleteList,
  fetchListById,
  updateListStatus,
  toggleItemCompletion,
} from "../redux/shoppingListSlice";

import * as api from "../services/api";
import axios from "axios";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mocks
vi.mock("axios");
vi.mock("../services/api");

// Initial state
const initialState = {
  shoppingLists: [],
  currentList: null,
  showItemInputs: false,
  error: "",
};

//
// ---------------------------
// 🔹 REDUCER TESTS
// ---------------------------
describe("shoppingListSlice Reducer Detailed Tests", () => {
  let state;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("should return the initial state when action is unknown", () => {
    const newState = reducer(undefined, { type: "unknown" });
    expect(newState).toEqual(initialState);
  });

  it("should toggle showItemInputs to true", () => {
    const newState = reducer(state, showItemInputFields());
    expect(newState.showItemInputs).toBe(true);
  });

  it("should toggle showItemInputs to false", () => {
    state.showItemInputs = true;
    const newState = reducer(state, hideItemInputFields());
    expect(newState.showItemInputs).toBe(false);
  });

  it("should populate shoppingLists on fetchAllSuccess", () => {
    const lists = [{ id: 1 }, { id: 2 }];
    const newState = reducer(state, fetchAllSuccess(lists));
    expect(newState.shoppingLists).toEqual(lists);
  });

  it("should set error on fetchAllFailure", () => {
    const error = "Fetch failed";
    const newState = reducer(state, fetchAllFailure(error));
    expect(newState.error).toBe("Error occurred - Fetch failed");
  });

  it("should add a shopping list on addShoppingListSuccess", () => {
    const newList = { id: 3, name: "Bakery" };
    const newState = reducer(state, addShoppingListSuccess(newList));
    expect(newState.shoppingLists).toHaveLength(1);
    expect(newState.shoppingLists[0]).toEqual(newList);
  });

  it("should set error on addShoppingListFailure", () => {
    const newState = reducer(state, addShoppingListFailure("Add failed"));
    expect(newState.error).toBe("Add failed");
  });

  it("should delete list on deleteListSuccess", () => {
    state.shoppingLists = [{ id: 1 }, { id: 2 }];
    const newState = reducer(state, deleteListSuccess(1));
    expect(newState.shoppingLists).toEqual([{ id: 2 }]);
  });

  it("should not delete list if ID not found", () => {
    state.shoppingLists = [{ id: 5 }];
    const newState = reducer(state, deleteListSuccess(999));
    expect(newState.shoppingLists).toEqual([{ id: 5 }]);
  });

  it("should set error on deleteListFailure", () => {
    const newState = reducer(state, deleteListFailure("DeleteError"));
    expect(newState.error).toBe("Delete failed - DeleteError");
  });

  it("should update list status on updateListStatusSuccess", () => {
    state.shoppingLists = [
      { id: 1, name: "Old", status: "pending" },
      { id: 2, name: "New", status: "pending" },
    ];
    const payload = { listId: 2, status: "done" };
    const newState = reducer(state, updateListStatusSuccess(payload));
    expect(newState.shoppingLists.find((l) => l.id === 2).status).toBe("done");
  });

  it("should not update if list ID not matched", () => {
    state.shoppingLists = [{ id: 1, status: "pending" }];
    const payload = { listId: 999, status: "done" };
    const newState = reducer(state, updateListStatusSuccess(payload));
    expect(newState.shoppingLists[0].status).toBe("pending");
  });

  it("should set error on updateListStatusFailure", () => {
    const newState = reducer(state, updateListStatusFailure("Server error"));
    expect(newState.error).toBe("Status update failed: Server error");
  });

  it("should set currentList on fetchListByIdSuccess", () => {
    const list = { id: 88, name: "Special" };
    const newState = reducer(state, fetchListByIdSuccess(list));
    expect(newState.currentList).toEqual(list);
  });

  it("should set error on fetchListByIdFailure", () => {
    const newState = reducer(state, fetchListByIdFailure("No list found"));
    expect(newState.error).toBe("No list found");
  });
});

//
// ---------------------------
// 🔹 THUNK TESTS
// ---------------------------
describe("shoppingListSlice Thunk Actions", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("addShoppingList dispatches success", async () => {
    const mockList = { id: 1, name: "Test List" };
    api.addShoppingListasync.mockResolvedValue({ status: 200 });

    await addShoppingList(mockList)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addShoppingListSuccess(mockList));
  });

  it("addShoppingList dispatches failure", async () => {
    const mockList = { id: 1, name: "Test List" };
    api.addShoppingListasync.mockResolvedValue({ status: 500 });

    await addShoppingList(mockList)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      addShoppingListFailure("list could not be added")
    );
  });

  it("deleteList dispatches success", async () => {
    axios.delete.mockResolvedValue({});
    await deleteList(1)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deleteListSuccess(1));
  });

  it("deleteList dispatches failure", async () => {
    axios.delete.mockRejectedValue(new Error("Server Error"));
    await deleteList(2)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deleteListFailure("Server Error"));
  });

  it("fetchListById dispatches success", async () => {
    const mockList = { id: 1, name: "Test List" };
    axios.get.mockResolvedValue({ data: mockList });

    await fetchListById(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchListByIdSuccess(mockList));
  });

  it("fetchListById dispatches failure", async () => {
    axios.get.mockRejectedValue(new Error("Not found"));

    await fetchListById(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchListByIdFailure("Not found"));
  });

  it("updateListStatus dispatches success payload", async () => {
    axios.patch.mockResolvedValue({ data: { status: "Done" } });

    const thunk = updateListStatus({
      listId: 10,
      status: "Done",
      category: "Grocery",
    });
    const result = await thunk(dispatch, () => {}, undefined);

    expect(result.payload).toEqual({ listId: 10, status: "Done" });
  });

  // You can continue with `toggleItemCompletion` and other thunks here
});
