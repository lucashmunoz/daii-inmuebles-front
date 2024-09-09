import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties/propertiesSlice";
import rentalsReducer from "./properties/rentalsSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    rentals: rentalsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
