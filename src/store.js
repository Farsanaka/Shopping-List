import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./features/shoppingList/shoppingListSlice";
import authReducer from "./services/authSlice";
import categoryReducer from "./features/category/categorySlice";
// import detailsReducer from "./features/shoppingList/detailsSlice";

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    auth: authReducer,
    category: categoryReducer,
    // details: detailsReducer,
  },
});

export default store;
