import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./redux/shoppingListSlice";
import authReducer from "./redux/authSlice";
import categoryReducer from "./redux/categorySlice";

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    auth: authReducer,
    category: categoryReducer,
  },
});

export default store;
