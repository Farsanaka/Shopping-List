// src/components/ProtectedRoute.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import '@testing-library/jest-dom';
import ProtectedRoute from "../components/ProtectedRoute";

// Dummy login component for testing redirection
const Login = () => <div>Login Page</div>;

describe("ProtectedRoute", () => {
  it("redirects to login if not authenticated", () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          isAuthenticated: false,
          user: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders protected content when authenticated", () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { name: "Test User" },
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
    expect(screen.getByText("Shoppie")).toBeInTheDocument(); // If Header renders text containing "Header"
  });
});
