import { createSlice } from "@reduxjs/toolkit";

const currentSlice = createSlice({
  name: "current",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementCurrent: (state) => {
      state.value += 1;
    },
  },
});

export const { incrementCurrent } = currentSlice.actions;
export default currentSlice.reducer;
