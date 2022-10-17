import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import currentReducer from "./currentSlice";
import transictionidReducer from "./transictionidSlice";
import reportReducer from "./reportSlice";
import filesReducer from "./filesSlice";
export default configureStore({
  reducer: {
    current: currentReducer,
    auth: authReducer,
    files: filesReducer,
    value: transictionidReducer,
    report: reportReducer,
    devTools: true,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
