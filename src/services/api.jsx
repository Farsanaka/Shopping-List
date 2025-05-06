import axios from "axios";

const API_URL = "http://localhost:5173/data";
export const fetchShoppingLists = async () => {
  const response = await axios.get(`http://localhost:5173/data/list.json`);
  return response.data.list;
};

export const fetchCategories = async () => {
  const response = await axios.get(`http://localhost:5173/data/category.json`);
  console.log("cat-data", response);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`http://localhost:5173/data/users.json`);
  return response.data.users;
};
