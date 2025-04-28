import axios from "axios";
// import "/data/list.json";

const API_URL = "/data/list.json";
export const fetchShoppingLists = async () => {
  const response = await axios.get(API_URL);

  return response.data.list;
};
// export const fetchCategories = async () => {
//   const response = await axios.get(API_URL);
//   return response.data.categories;
// };
