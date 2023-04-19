import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";

const store = configureStore({
  reducer: {
    app: todoReducer,
  },
});

export default store;
