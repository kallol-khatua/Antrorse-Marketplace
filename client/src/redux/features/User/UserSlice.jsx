import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: JSON.parse(localStorage.getItem("user")) ?? false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.authorized = action.payload;
      localStorage.setItem("user", JSON.stringify(state.authorized));
    },
  },
});

export const { auth } = userSlice.actions;

export default userSlice.reducer;
