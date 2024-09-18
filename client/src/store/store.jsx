import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../redux/features/Cart/CartSlice";
import wishlistReducer from "../redux/features/Wishlist/WishlistSlice";
import sortingReducer from "../redux/features/Sort/SortSlice";
import userReducer from "../redux/features/User/UserSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    sort: sortingReducer,
    user: userReducer,
  },
});
