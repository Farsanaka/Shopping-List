import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "./App";

// Mocking all pages and components
vi.mock("./pages/Home", () => ({ default: () => <div>Home Page</div> }));
vi.mock("./pages/Login", () => ({ default: () => <div>Login Page</div> }));
vi.mock("./pages/AddList", () => ({ default: () => <div>Add List Page</div> }));
vi.mock("./pages/ListDetails", () => ({
  default: () => <div>List Details Page</div>,
}));
vi.mock("./pages/Category", () => ({
  default: () => <div>Category Page</div>,
}));
vi.mock("./components/ProtectedRoute", () => ({
  default: ({ children }) => <>{children}</>,
}));

describe("App routing", () => {
  it("redirects / to /home", () => {
    const router = createMemoryRouter(App().props.router.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders login page at /login", () => {
    const router = createMemoryRouter(App().props.router.routes, {
      initialEntries: ["/login"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders AddList page at /home/list", () => {
    const router = createMemoryRouter(App().props.router.routes, {
      initialEntries: ["/home/list"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Add List Page")).toBeInTheDocument();
  });

  it("renders ListDetails page at /home/list/123", () => {
    const router = createMemoryRouter(App().props.router.routes, {
      initialEntries: ["/home/list/123"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("List Details Page")).toBeInTheDocument();
  });

  it("renders Category page at /home/category", () => {
    const router = createMemoryRouter(App().props.router.routes, {
      initialEntries: ["/home/category"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Category Page")).toBeInTheDocument();
  });
});
