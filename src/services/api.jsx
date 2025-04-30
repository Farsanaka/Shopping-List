import axios from "axios";
// import "/data/list.json";

const API_URL = "/data";
export const fetchShoppingLists = async () => {
  const response = await axios.get(`${API_URL}/list.json`);
  return response.data.list;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/category.json`);
  console.log("cat-data", response);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users.json`);
  return response.data.users;
};
