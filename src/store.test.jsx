import { describe, it, expect } from "vitest";
import store from "./store";
import {
  showItemInputFields,
  hideItemInputFields,
} from "./redux/shoppingListSlice";
import { loginSuccess, logout } from "./redux/authSlice";
import { setCategory } from "./redux/categorySlice";

describe("Redux store", () => {
  it("should have the expected initial state", () => {
    const state = store.getState();
    expect(state.shoppingList).toBeDefined();
    expect(state.auth).toBeDefined();
    expect(state.category).toBeDefined();
  });

  it("should update shoppingList.showItemInputs on dispatch", () => {
    store.dispatch(showItemInputFields());
    expect(store.getState().shoppingList.showItemInputs).toBe(true);

    store.dispatch(hideItemInputFields());
    expect(store.getState().shoppingList.showItemInputs).toBe(false);
  });

  it("should update auth state on login and logout", () => {
    const user = { id: 1, name: "Alice" };

    store.dispatch(loginSuccess(user));
    expect(store.getState().auth.user).toEqual(user);

    store.dispatch(logout());
    expect(store.getState().auth.user).toBe(null);
  });

  it("should update categories", () => {
    const categories = [];
    store.dispatch(setCategory(categories));
    expect(store.getState().category.categories).toEqual(categories);
  });
});
