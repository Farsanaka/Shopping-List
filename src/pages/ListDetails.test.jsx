import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListDetails from "../pages/ListDetails";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import Swal from "sweetalert2";
import configureMockStore from "redux-mock-store";

// Mocks
vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

const mockStore = configureMockStore();

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (original) => {
  const actual = await original();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Sample data
const sampleList = {
  id: "1",
  name: "Grocery List",
  date: "2024-05-19",
  category: "Food",
  status: "Pending",
  items: [
    { itemName: "Apples", quantity: 5, completed: false },
    { itemName: "Bread", quantity: 1, completed: false },
  ],
};

describe("ListDetails", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      shoppingList: {
        currentList: sampleList,
      },
    });

    store.dispatch = vi.fn();
  });

  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/lists/1"]}>
          <Routes>
            <Route path="/lists/:id" element={<ListDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  it("renders the list details", async () => {
    renderWithProviders();

    expect(screen.getByText("Grocery List")).toBeInTheDocument();
    expect(screen.getByText(/Date:/)).toHaveTextContent("2024-05-19");
    expect(screen.getByText(/Category:/)).toHaveTextContent("Food");
    expect(screen.getByText(/Status:/)).toHaveTextContent("Pending");
  });

  it("renders items and allows editing", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("Edit"));

    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0].value).toBe("Apples");

    fireEvent.change(inputs[0], { target: { value: "Oranges" } });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "success" })
      );
    });
  });

  it("marks all items complete", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("Mark All Complete"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(4); // updateItems, updateStatus, fetchListById
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({ text: "List Marked as Complete" })
      );
    });
  });

  it("goes back on 'Back' button click", () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("Back"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
