import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    email: "",
    transactionId: "",
  },
  reducers: {
    store: (state, action) => {
      const { payload } = action;
      state.transactionId = payload.transactionId;
      state.email = payload.email;
    },
    reInit: (state) => {
      state.transactionId = "";
      state.email = "";
    },
  },
});
export const { store, reInit } = transactionSlice.actions;
export default transactionSlice.reducer;
