import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./features/shoppingList/shoppingListSlice";
import authReducer from "./services/authSlice";
import categoryReducer from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    auth: authReducer,
    category: categoryReducer,
  },
});

export default store;
