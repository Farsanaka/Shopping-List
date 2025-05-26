import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import configureStore from "redux-mock-store";
import * as api from "../services/api";
import * as authSlice from "../redux/authSlice";

const mockStore = configureStore();
const mockNavigate = vi.fn();

// Mock useNavigate
vi.mock("react-router-dom", async (original) => {
  const actual = await original();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
vi.mock("../services/api", () => ({
  fetchUsers: vi.fn(),
}));

describe("Login Page", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

  it("renders input fields and button", () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("logs in successfully with correct credentials", async () => {
    const mockUser = { username: "test@example.com", password: "123456" };
    api.fetchUsers.mockResolvedValueOnce([mockUser]);

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: mockUser.username },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockUser.password },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(authSlice.loginPending());
      expect(store.dispatch).toHaveBeenCalledWith(
        authSlice.loginSuccess(mockUser)
      );
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("shows alert and dispatches failure on wrong credentials", async () => {
    const mockUser = { username: "test@example.com", password: "123456" };
    api.fetchUsers.mockResolvedValueOnce([mockUser]);

    window.alert = vi.fn(); // mock alert

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(authSlice.loginPending());
      expect(store.dispatch).toHaveBeenCalledWith(
        authSlice.loginFailure("Wrong password or username")
      );
      expect(window.alert).toHaveBeenCalledWith("Wrong password or username");
    });
  });

  it("handles fetch error and dispatches loginFailure", async () => {
    const mockError = new Error("API failed");
    api.fetchUsers.mockRejectedValueOnce(mockError);

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "any@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(authSlice.loginPending());
      expect(store.dispatch).toHaveBeenCalledWith(
        authSlice.loginFailure(mockError.message)
      );
    });
  });
});
