import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchShoppingLists,
  fetchCategories,
  fetchUsers,
  addShoppingListasync,
} from "../services/api";

// Mock axios
vi.mock("axios");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("API Service Tests", () => {
  const mockList = [{ id: 1, name: "Groceries" }];
  const mockUsers = [{ id: 1, username: "john" }];
  const mockCategories = [{ id: 1, category: "Food" }];
  const mockNewList = { name: "Utilities", userid: 5 };

  it("fetchShoppingLists should return shopping lists", async () => {
    axios.get.mockResolvedValueOnce({ data: mockList });

    const result = await fetchShoppingLists();

    expect(axios.get).toHaveBeenCalledWith(import.meta.env.VITE_LIST_API_URL);
    expect(result).toEqual(mockList);
  });

  it("fetchCategories should return categories", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCategories });

    const result = await fetchCategories();

    expect(axios.get).toHaveBeenCalledWith(import.meta.env.VITE_CATEGORIES_API_URL);
    expect(result).toEqual(mockCategories);
  });

  it("fetchUsers should return users", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await fetchUsers();

    expect(axios.get).toHaveBeenCalledWith(import.meta.env.VITE_USER_API_URL);
    expect(result).toEqual(mockUsers);
  });

  it("addShoppingListasync should post new list and return response", async () => {
    const mockResponse = { status: 200, data: { ...mockNewList, id: 99 } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await addShoppingListasync(mockNewList);

    expect(axios.post).toHaveBeenCalledWith(import.meta.env.VITE_LIST_API_URL, mockNewList);
    expect(result).toEqual(mockResponse);
  });
});
