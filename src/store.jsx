import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./features/shoppingList/shoppingListSlice";
import userReducer from "./features/user/userSlice";
import categoryReducer from "./features/category/categorySlice";
import detailsReducer from "./features/shoppingList/detailsSlice";

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    user: userReducer,
    category: categoryReducer,
    details: detailsReducer,
  },
});

export default store;
