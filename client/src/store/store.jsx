import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../redux/features/Cart/CartSlice";
import wishlistReducer from "../redux/features/Wishlist/WishlistSlice";
import sortingReducer from "../redux/features/Sort/SortSlice";
import userReducer from "../redux/features/User/UserSlice";
import sellerReducer from "../redux/features/Seller/SellerSclice";
import adminSlice from "../redux/features/Admin/AdminSclice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    sort: sortingReducer,
    user: userReducer,
    seller: sellerReducer,
    admin: adminSlice,
  },
});
