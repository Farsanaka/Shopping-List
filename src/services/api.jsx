import axios from "axios";
// import "/data/list.json";

// const API_URL = "https://localhost:5173/data";
export const fetchShoppingLists = async () => {
  const response = await axios.get(`http://localhost:9000/list`);
  console.log("within fetchusers", response);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`http://localhost:9000/categories`);
  console.log("cat-data", response);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`http://localhost:9000/users`);

  return response.data;
};
export const addShoppingListasync = async (newList) => {
  console.log("entered async shoppinglist");
  const response = await axios.post(`http://localhost:9000/list`, newList);
  console.log("response for addlist is", response);
  return response;
};
