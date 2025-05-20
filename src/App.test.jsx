import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// ✅ Correct way to mock ES modules with default exports
vi.mock("./pages/Home", () => ({ default: () => <div>Home Page</div> }));
vi.mock("./pages/Login", () => ({ default: () => <div>Login Page</div> }));
vi.mock("./pages/AddList", () => ({ default: () => <div>Add List Page</div> }));
vi.mock("./pages/ListDetails", () => ({ default: () => <div>List Details Page</div> }));
vi.mock("./pages/Category", () => ({ default: () => <div>Category Page</div> }));

// ✅ ProtectedRoute mock should also return a default component
vi.mock("./components/ProtectedRoute", () => ({
  default: ({ children }) => <>{children}</>,
}));

describe("App routing", () => {
  it("redirects / to /home", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders login page at /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders AddList page at /home/list", () => {
    render(
      <MemoryRouter initialEntries={["/home/list"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Add List Page")).toBeInTheDocument();
  });

  it("renders ListDetails page at /home/list/123", () => {
    render(
      <MemoryRouter initialEntries={["/home/list/123"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("List Details Page")).toBeInTheDocument();
  });

  it("renders Category page at /home/category", () => {
    render(
      <MemoryRouter initialEntries={["/home/category"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Category Page")).toBeInTheDocument();
  });
});
