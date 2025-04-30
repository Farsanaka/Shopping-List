import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./features/shoppingList/shoppingListSlice";
import userReducer from "./features/user/userSlice";
import categoryReducer from "./features/category/categorySlice"; // <-- add this

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;
