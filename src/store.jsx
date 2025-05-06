import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./features/shoppingList/shoppingListSlice";
import userReducer from "./features/user/userSlice";
<<<<<<< HEAD
import categoryReducer from "./features/category/categorySlice"; // <-- add this
import detailsReducer from "./features/shoppingList/detailsSlice";
=======
import categoryReducer from "./features/category/categorySlice";
import detailsReducer from "./features/shoppingList/detailsSlice";

>>>>>>> 22db0f6ad79eca1f269efb2a7661645df6c8d207
const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    user: userReducer,
    category: categoryReducer,
    details: detailsReducer,
  },
});

export default store;
