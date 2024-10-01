import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";

interface PricePrediction {
  classification: string;
  estimated_price: number;
}

interface PropertyDetailsState {
  propertyDetails: Property;
  propertyDetailsStatus: "SUCCESS" | "ERROR" | "LOADING";
  pricePrediction: PricePrediction;
  pricePredictionStatus: "SUCCESS" | "ERROR" | "LOADING";
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
    title: "",
    description: "",
    district: "",
    latitude: 0,
    longitude: 0,
    images: [""],
    address: "",
    price: 0,
    garages: 0,
    type: "APARTMENT",
    surface_covered: 0,
    surface_total: 0,
    zipcode: ""
  },
  propertyDetailsStatus: "LOADING",
  pricePrediction: {
    classification: "",
    estimated_price: 0
  },
  pricePredictionStatus: "LOADING"
};

interface FetchPropertyDetailsPayload {
  propertyId: number;
}

export const fetchPropertyDetails = createAsyncThunk(
  "users/fetchPropertyDetails",
  async ({ propertyId }: FetchPropertyDetailsPayload, { rejectWithValue }) => {
    const fetchPropertyDetailsUrl = `${API_HOST}${endpoints.properties}/${propertyId}`;
    try {
      const response = await api.get(fetchPropertyDetailsUrl);
      return response.data as Property;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPropertyPricePrediction = createAsyncThunk(
  "users/fetchPropertyPricePrediction",
  async (propertyId: number, { rejectWithValue }) => {
    const fetchPricePredictionUrl = `${API_HOST}${endpoints.predictPrice}/${propertyId}`;
    try {
      const response = await api.get(fetchPricePredictionUrl);
      return response.data as PricePrediction;
    } catch (error) {
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
        state.propertyDetails = {
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
          title: "",
          description: "",
          district: "",
          latitude: 0,
          longitude: 0,
          images: [""],
          address: "",
          price: 0,
          garages: 0,
          type: "APARTMENT",
          surface_covered: 0,
          surface_total: 0,
          zipcode: ""
        };
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.propertyDetailsStatus = "SUCCESS";
        state.propertyDetails = action.payload;
      })
      .addCase(fetchPropertyDetails.rejected, (state) => {
        state.propertyDetailsStatus = "ERROR";
        state.propertyDetails = {
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
          title: "",
          description: "",
          district: "",
          latitude: 0,
          longitude: 0,
          images: [""],
          address: "",
          price: 0,
          garages: 0,
          type: "APARTMENT",
          surface_covered: 0,
          surface_total: 0,
          zipcode: ""
        };
      })
      .addCase(fetchPropertyPricePrediction.pending, (state) => {
        state.pricePredictionStatus = "LOADING";
        state.pricePrediction = {
          classification: "",
          estimated_price: 0
        };
      })
      .addCase(fetchPropertyPricePrediction.fulfilled, (state, action) => {
        state.pricePredictionStatus = "SUCCESS";
        state.pricePrediction = action.payload;
      })
      .addCase(fetchPropertyPricePrediction.rejected, (state) => {
        state.pricePredictionStatus = "ERROR";
        state.pricePrediction = {
          classification: "",
          estimated_price: 0
        };
      });
  }
});

export const selectPropertyDetails = (state: RootState) =>
  state.propertyDetails.propertyDetails || {};
export const selectPropertyDetailsStatus = (state: RootState) =>
  state.propertyDetails.propertyDetailsStatus;
export const selectPricePrediction = (state: RootState) =>
  state.propertyDetails.pricePrediction;
export const selectPricePredictionStatus = (state: RootState) =>
  state.propertyDetails.pricePredictionStatus;

export const { bookmarkProperty, unbookmarkProperty } =
  propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;
