import { configureStore } from "@reduxjs/toolkit";
// import { increment, decrement } from "./CounterSlice";
import counterReducer from "./CounterSlice";

const store = configureStore({
  reducer: {
    passenger: counterReducer,
  },
});

export default store;
