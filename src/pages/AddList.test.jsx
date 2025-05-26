import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddList from "./AddList";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "../redux/shoppingListSlice";
import categoryReducer from "../redux/categorySlice";
import authReducer from "../redux/authSlice";
import Swal from "sweetalert2";

vi.mock("sweetalert2", async () => {
  return {
    default: {
      fire: vi.fn(),
    },
  };
});

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      shoppingList: shoppingListReducer,
      category: categoryReducer,
    },
    preloadedState,
  });

// Custom render function
const renderWithProviders = (store) => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/add-list"]}>
        <Routes>
          <Route path="/add-list" element={<AddList />} />
          <Route path="/home" element={<div>Mock Home Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("AddList component", () => {
  let store;

  beforeEach(() => {
    store = createTestStore({
      auth: { user: { id: "user1", name: "Test User" } },
      shoppingList: { status: "idle", error: null, lists: [] },
      category: {
        categories: [
          { code: "Groceries", userId: "user1" },
          { code: "Electronics", userId: "user1" },
        ],
        status: "idle",
        error: null,
      },
    });
  });

  it("renders inputs and buttons", () => {
    renderWithProviders(store);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByText("Add Category")).toBeInTheDocument();
    expect(screen.getByText("ADD NEW LIST")).toBeInTheDocument();
  });

  it("shows item input only after entering name and category", async () => {
    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Weekly Groceries" },
    });
    fireEvent.change(screen.getByDisplayValue("Choose Category"), {
      target: { value: "Groceries" },
    });

    expect(await screen.findByPlaceholderText("Quantity")).toBeInTheDocument();
  });

  it("adds item to the list", async () => {
    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Shopping" },
    });
    fireEvent.change(screen.getByDisplayValue("Choose Category"), {
      target: { value: "Groceries" },
    });

    await screen.findByPlaceholderText("Item Name / Description");

    fireEvent.change(screen.getByPlaceholderText("Quantity"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Item Name / Description"), {
      target: { value: "Apples" },
    });

    fireEvent.click(screen.getByText("Add Item"));

    expect(await screen.findByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("validates missing item fields", async () => {
    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Shopping" },
    });
    fireEvent.change(screen.getByDisplayValue("Choose Category"), {
      target: { value: "Groceries" },
    });

    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "warning",
          title: "Missing Fields",
        })
      );
    });
  });

  it("shows alert if trying to save without items", async () => {
    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Shopping" },
    });
    fireEvent.change(screen.getByDisplayValue("Choose Category"), {
      target: { value: "Groceries" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "warning",
          title: "No Items Added",
        })
      );
    });
  });
});
