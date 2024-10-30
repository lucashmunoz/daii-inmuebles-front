import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import propertiesReducer from "./properties/propertiesSlice";
import propertyDetailsReducer from "./properties/propertyDetailsSlice";
import myPropertiesReducer from "./properties/myPropertiesSlice";
import rentalsReducer from "./properties/rentalsSlice";
import districtsReducer from "./properties/districtsSlice";
import bookmarksReducer from "./properties/bookmarksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
    propertyDetails: propertyDetailsReducer,
    myProperties: myPropertiesReducer,
    rentals: rentalsReducer,
    districts: districtsReducer,
    bookmarks: bookmarksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
