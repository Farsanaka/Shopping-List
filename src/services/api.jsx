import axios from "axios";
const SL_API_BASE_URL = import.meta.env.VITE_API_URL;
const SL_USERS_URL = import.meta.env.VITE_USER_API_URL;
const SL_LIST_URL = import.meta.env.VITE_LIST_API_URL;
const SL_CATEGORIES_URL = import.meta.env.VITE_CATEGORIES_API_URL;

export const fetchShoppingLists = async () => {
  const response = await axios.get(SL_LIST_URL);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(SL_CATEGORIES_URL);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(SL_USERS_URL);

  return response.data;
};
export const addShoppingListasync = async (newList) => {
  const response = await axios.post(SL_LIST_URL, newList);
  return response;
};
