import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: JSON.parse(localStorage.getItem("isAuthorizedSeller")) ?? false,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

export const setSellerAuth = (authState) => (dispatch) => {
  dispatch(auth(authState));
  localStorage.setItem("isAuthorizedSeller", JSON.stringify(authState));
};

export const { auth } = sellerSlice.actions;

export default sellerSlice.reducer;
