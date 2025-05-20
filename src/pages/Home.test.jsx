import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Swal from "sweetalert2";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import shoppingListReducer, {
  fetchAll,
  deleteList,
} from "../redux/shoppingListSlice";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../redux/shoppingListSlice", async () => {
  const actual = await vi.importActual("../redux/shoppingListSlice");
  return {
    ...actual,
    fetchAll: vi.fn(() => () => Promise.resolve()),
    deleteList: vi.fn((id) => () => Promise.resolve(id)),
  };
});

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

const renderWithStore = (authState, shoppingListState) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      shoppingList: shoppingListReducer,
    },
    preloadedState: {
      auth: authState,
      shoppingList: shoppingListState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/home"]}>
        <Home />
      </MemoryRouter>
    </Provider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  mockNavigate.mockReset();
});

it("renders loading state initially", () => {
  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: [], status: "loading", error: null }
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

it("renders error state", () => {
  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: [], status: "failed", error: "Network error" }
  );

  expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
});

it("shows no list message when list is empty", () => {
  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: [], status: "succeeded", error: null }
  );

  expect(
    screen.getByText(/you do not have any lists yet/i)
  ).toBeInTheDocument();
});

it("renders shopping list items", () => {
  const mockList = [
    {
      id: 1,
      date: "2025-05-20",
      category: "Groceries",
      name: "Weekly Shopping",
      status: "Pending",
    },
  ];

  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: mockList, status: "succeeded", error: null }
  );

  expect(screen.getByDisplayValue("Groceries")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();
  expect(screen.getByText("View Details")).toHaveAttribute(
    "href",
    "/home/list/1"
  );
});

it("calls deleteList and shows Swal on delete", () => {
  const mockList = [
    {
      id: 1,
      date: "2025-05-20",
      category: "Groceries",
      name: "Weekly Shopping",
      status: "Pending",
    },
  ];

  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: mockList, status: "succeeded", error: null }
  );

  const deleteBtn = screen.getByText("Delete");
  fireEvent.click(deleteBtn);

  expect(deleteList).toHaveBeenCalledWith(1);
  expect(Swal.fire).toHaveBeenCalledWith({
    icon: "success",
    title: "Deleted!",
    text: "Deleted successfully!",
    showConfirmButton: false,
    timer: 1500,
  });
});

it("redirects to login if user is null", () => {
  renderWithStore(
    { user: null },
    { shoppingLists: [], status: "idle", error: null }
  );

  expect(mockNavigate).toHaveBeenCalledWith("/login");
});

it("navigates through pagination", () => {
  const mockList = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    date: "2025-05-20",
    category: "Cat",
    name: `Item ${i + 1}`,
    status: "Pending",
  }));

  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: mockList, status: "succeeded", error: null }
  );

  const nextBtn = screen.getByText("Next");
  fireEvent.click(nextBtn);

  const prevBtn = screen.getByText("Previous");
  fireEvent.click(prevBtn);

  expect(nextBtn).toBeInTheDocument();
  expect(prevBtn).toBeInTheDocument();
});

it("toggles items per page dropdown and selects an option", () => {
  const mockList = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    date: "2025-05-20",
    category: "Cat",
    name: `Item ${i + 1}`,
    status: "Pending",
  }));

  renderWithStore(
    { user: { id: 1 } },
    { shoppingLists: mockList, status: "succeeded", error: null }
  );

  const dropdownToggle = screen.getByText("Show");
  fireEvent.click(dropdownToggle);

  const option = screen.getByText("Show 10");
  fireEvent.click(option);

  expect(screen.getByText("Show")).toBeInTheDocument();
});
