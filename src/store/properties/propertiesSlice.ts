import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { endpoints } from "../../api/endpoints";
import { API_HOST, ErrorResponse } from "../../api/api";

export type SortBy = "PRICE_ASC" | "PRICE_DESC" | "RECENT"
export type PropertyType = "HOUSE" | "APARTMENT" | "SEMIFLOOR" | "FLOOR" | "DUPLEX" | "TRIPLEX" | "PENTHOUSE"

interface Property {
  id: number,
  beds: number,
  bathrooms: number,
  country: string,
  city: string,
  state: string,
  rooms: number,
  title: string,
  description: string,
  latitude: number,
  longitude: number,
  images: [
    string
  ],
  address: string,
  storeys: number,
  price: number,
  garages: number,
  type: PropertyType,
  active: true,
  surface_covered: number,
  surface_total: number,
  user_id: number,
  created_at: Date
}

interface PropertyState {
  loadingProperties: boolean
  properties: Property[],
  error: string
}
  
const initialState: PropertyState = {
  loadingProperties: true,
  properties: [],
  error: "" 
};
  
export const fetchProperties = createAsyncThunk(
  "users/fetchProperties",
  async ({ sortBy, propertyType } : { sortBy?: SortBy, propertyType?: PropertyType }, { rejectWithValue }) => {
    const sortByQuery = sortBy ? `sortBy:${sortBy}` : "";
    const propertyTypeQuery = sortBy ? `propertyType:${propertyType}` : "";
    const fetchPropertiesUrl = API_HOST + endpoints.properties + sortByQuery + propertyTypeQuery;

    try{
      const response = await axios.get(fetchPropertiesUrl);
      return response.data as Property[];
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.pending, (state) => {
      state.loadingProperties = true;
      state.properties = [];
      state.error = "";
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loadingProperties = false;
      state.error = "";
      state.properties = action.payload;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      const error = action.payload as ErrorResponse;
      state.loadingProperties = false;
      state.error = error.message;
      state.properties = [];
    });
  }
});
    
export const selectProperties = (state: RootState) => state.properties.properties;
export const selectLoadingProperties = (state: RootState) => state.properties.loadingProperties;
export const selectPropertiesError = (state: RootState) => state.properties.error;
  
export default propertiesSlice.reducer;
