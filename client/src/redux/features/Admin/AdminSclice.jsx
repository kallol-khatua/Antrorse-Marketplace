import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: JSON.parse(localStorage.getItem("isAuthorizedAdmin")) ?? false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

export const setAdminAuth = (authState) => (dispatch) => {
  dispatch(auth(authState));
  localStorage.setItem("isAuthorizedAdmin", JSON.stringify(authState));
};

export const { auth } = adminSlice.actions;

export default adminSlice.reducer;
