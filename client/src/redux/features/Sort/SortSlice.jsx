import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sorting: 1,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sortingOption(state, action) {
      const sortingKeyId = action.payload;
      state.sorting = sortingKeyId;
    },
  },
});

export const { sortingOption } = sortSlice.actions;

export default sortSlice.reducer;
