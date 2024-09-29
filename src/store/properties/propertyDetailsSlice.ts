import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";

interface PropertyDetailsState {
  propertyDetails: Property,
  propertyDetailsStatus: "SUCCESS" | "ERROR" | "LOADING"
}

const initialState: PropertyDetailsState = {
  propertyDetails: {
    id: 0,
    beds: 0,
    bathrooms: 0,
    country: "",
    active: true,
    created_at: "",
    favorite: false,
    city: "",
    state: "",
    rooms: 0,
    created_at: "",
    active: true,
    title: "",
    description: "",
    district: "",
    latitude: 0,
    longitude: 0,
    images: [
      ""
    ],
    address: "",
    storeys: 0,
    price: 0,
    garages: 0,
    type: "APARTMENT",
    surface_covered: 0,
    surface_total: 0
  },
  propertyDetailsStatus: "LOADING"
};

interface FetchPropertyDetailsPayload {
  propertyId: number
}

export const fetchPropertyDetails = createAsyncThunk(
  "users/fetchPropertyDetails",
  async ({ propertyId }: FetchPropertyDetailsPayload, { rejectWithValue }) => {
    const fetchPropertyDetailsUrl = `${API_HOST}${endpoints.properties}/${propertyId}`;
    try{
      const response = await api.get(fetchPropertyDetailsUrl);
      return response.data as Property;
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const propertyDetailsSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    bookmarkProperty: (state) => {
      state.propertyDetails.favorite = true;
    },
    unbookmarkProperty: (state) => {
      state.propertyDetails.favorite = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.propertyDetailsStatus = "LOADING";
        state.propertyDetails = {} as Property;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.propertyDetailsStatus = "SUCCESS";
        state.propertyDetails = action.payload;
      })
      .addCase(fetchPropertyDetails.rejected, (state) => {
        state.propertyDetailsStatus = "ERROR";
        state.propertyDetails = {} as Property;
      });
  }
});

export const selectPropertyDetails = (state: RootState) => state.propertyDetails.propertyDetails || {};
export const selectPropertyDetailsStatus = (state: RootState) => state.propertyDetails.propertyDetailsStatus;

export const { bookmarkProperty, unbookmarkProperty } = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;
