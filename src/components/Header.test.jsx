import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/Header";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (original) => {
  const actual = await original();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockStore = configureStore();

describe("NavBar", () => {
  let store;

  const renderWithProviders = (authState) => {
    store = mockStore({ auth: authState });
    store.dispatch = vi.fn();

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );
  };

  it("displays 'Guest' and login button when not authenticated", () => {
    renderWithProviders({ isAuthenticated: false, user: null });

    expect(screen.getByText(/Welcome, Guest/i)).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("displays username and logout button when authenticated", () => {
    renderWithProviders({
      isAuthenticated: true,
      user: { name: "Alice" },
    });

    expect(screen.getByText(/Welcome, Alice/i)).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("dispatches logout and navigates on logout click", () => {
    renderWithProviders({
      isAuthenticated: true,
      user: { name: "Bob" },
    });

    fireEvent.click(screen.getByText("Logout"));

    expect(store.dispatch).toHaveBeenCalled();
  });
});
