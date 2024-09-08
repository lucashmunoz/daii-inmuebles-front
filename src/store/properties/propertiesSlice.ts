import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property, SortBy } from "../../models/property";
import { Filters } from "../../context/PropertiesFiltersContext";

interface PropertyState {
  loadingProperties: boolean
  properties: Property[],
  isPropertiesError: boolean
}

const initialState: PropertyState = {
  loadingProperties: true,
  properties: [],
  isPropertiesError: false
};

interface FetchPropertiesParams {
  sortBy?: SortBy,
  filters?: Partial<Filters>
}

export const fetchProperties = createAsyncThunk(
  "users/fetchProperties",
  async ({ sortBy, filters = {} }: FetchPropertiesParams, { rejectWithValue }) => {
    const sortByQuery = sortBy ? `sortBy=${sortBy}` : "";

    const {
      type,
      textSearch,
      minPrice,
      maxPrice,
      minRooms,
      maxRooms,
      minBeds,
      maxBeds,
      minBathrooms,
      maxBathrooms,
      minSurface,
      maxSurface,
      surfaceType
    } = filters;

    const propertyTypeQuery = type ? `propertyType=${type}` : "";
    const textSearchQuery = textSearch ? `textSearch=${textSearch}` : "";
    const minPriceQuery = minPrice ? `minPrice=${minPrice}` : "";
    const maxPriceQuery = maxPrice ? `maxPrice=${maxPrice}` : "";
    const minRoomsQuery = minRooms ? `minRooms=${minRooms}` : "";
    const maxRoomsQuery = maxRooms ? `maxRooms=${maxRooms}` : "";
    const minBedsQuery = minBeds ? `minBeds=${minBeds}` : "";
    const maxBedsQuery = maxBeds ? `maxBeds=${maxBeds}` : "";
    const minBathroomsQuery = minBathrooms ? `minBathrooms=${minBathrooms}` : "";
    const maxBathroomsQuery = maxBathrooms ? `maxBathrooms=${maxBathrooms}` : "";
    const minSurfaceCoveredQuery = minSurface && surfaceType === "COVERED" ? `minSurfaceCovered=${minSurface}` : "";
    const maxSurfaceCoveredQuery = maxSurface && surfaceType === "COVERED" ? `maxSurfaceCovered=${maxSurface}` : "";
    const minSurfaceTotalQuery = minSurface && surfaceType === "TOTAL" ? `minSurfaceTotal=${minSurface}` : "";
    const maxSurfaceTotalQuery = maxSurface && surfaceType === "TOTAL" ? `maxSurfaceTotal=${maxSurface}` : "";

    const queries = [
      sortByQuery,
      propertyTypeQuery,
      textSearchQuery,
      minPriceQuery,
      maxPriceQuery,
      minRoomsQuery,
      maxRoomsQuery,
      minBedsQuery,
      maxBedsQuery,
      minBathroomsQuery,
      maxBathroomsQuery,
      minSurfaceCoveredQuery,
      maxSurfaceCoveredQuery,
      minSurfaceTotalQuery,
      maxSurfaceTotalQuery
    ].filter(query => query !== "").join("&");

    const fetchPropertiesUrl = `${API_HOST}${endpoints.properties}?${queries}`;

    try{
      const response = await api.get(fetchPropertiesUrl);
      return response.data.content as Property[];
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
      state.isPropertiesError = false;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loadingProperties = false;
      state.isPropertiesError = false;
      state.properties = action.payload;
    });
    builder.addCase(fetchProperties.rejected, (state) => {
      state.loadingProperties = false;
      state.isPropertiesError = true;
      state.properties = [];
    });
  }
});

export const selectProperties = (state: RootState) => state.properties.properties;
export const selectLoadingProperties = (state: RootState) => state.properties.loadingProperties;
export const selectIsPropertiesError = (state: RootState) => state.properties.isPropertiesError;

export default propertiesSlice.reducer;
