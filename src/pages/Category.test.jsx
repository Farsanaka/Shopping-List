import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Category from "./Category";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import categoryReducer, {
  addCategory,
  updateCategory,
} from "../redux/categorySlice";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe("Category Component", () => {
  let store;

  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Category />
        </MemoryRouter>
      </Provider>
    );

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        category: categoryReducer,
      },
      preloadedState: {
        auth: {
          user: { id: "user1" },
        },
        category: {
          categories: [
            { id: "1", code: "C01", category: "Fruits", userId: "user1" },
            { id: "2", code: "C02", category: "Vegetables", userId: "user1" },
          ],
          error: null,
          status: "succeeded",
          code: "",
          category: "",
        },
      },
    });

    vi.spyOn(store, "dispatch"); // Spy on dispatch
  });

  it("renders inputs and add button", () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText("Code")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("dispatches addCategory and shows success alert", async () => {
    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText("Code"), {
      target: { value: "C03" },
    });
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Dairy" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();

      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "success" })
      );
    });
  });

  it("shows validation error if category is empty", async () => {
    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText("Code"), {
      target: { value: "C04" },
    });
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "error" })
      );
    });
  });

it("renders categories and allows editing", async () => {
  renderWithProviders();

  const fruitsInput = await screen.findByDisplayValue("Fruits");
  expect(fruitsInput).toBeInTheDocument();

  fireEvent.click(screen.getAllByText("Edit")[0]);

  fireEvent.change(fruitsInput, { target: { value: "Fresh Fruits" } });

  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => {
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});


});
