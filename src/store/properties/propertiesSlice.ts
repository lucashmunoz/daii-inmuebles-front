import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property, PropertyType, SortBy, SurfaceType } from "../../models/property";

interface Filters {
  type: PropertyType
  textSearch: string
  minPrice: string
  maxPrice: string
  minSurface: string
  maxSurface: string
  surfaceType: SurfaceType
  minBeds: string
  maxBeds: string
  minRooms: string
  maxRooms: string
  minBathrooms: string
  maxBathrooms: string
}

interface PropertyState {
  loadingProperties: boolean
  properties: Property[],
  isPropertiesError: boolean,

  loadingRecentProperties: boolean
  recentProperties: Property[],
  isRecentPropertiesError: boolean
}

const initialState: PropertyState = {
  loadingProperties: true,
  properties: [],
  isPropertiesError: false,

  loadingRecentProperties: true,
  recentProperties: [],
  isRecentPropertiesError: false
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

export const fetchRecentProperties = createAsyncThunk(
  "users/fetchRecentProperties",
  async (_, { rejectWithValue }) => {
    const fetchRecentPropertiesUrl = `${API_HOST}${endpoints.properties}?sortBy=RECENT`;
    try{
      const response = await api.get(fetchRecentPropertiesUrl);
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
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loadingProperties = true;
        state.properties = [];
        state.isPropertiesError = false;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loadingProperties = false;
        state.isPropertiesError = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state) => {
        state.loadingProperties = false;
        state.isPropertiesError = true;
        state.properties = [];
      })
      .addCase(fetchRecentProperties.pending, (state) => {
        state.loadingRecentProperties = true;
        state.recentProperties = [];
        state.isRecentPropertiesError = false;
      })
      .addCase(fetchRecentProperties.fulfilled, (state, action) => {
        state.loadingRecentProperties = false;
        state.isRecentPropertiesError = false;
        state.recentProperties = action.payload;
      })
      .addCase(fetchRecentProperties.rejected, (state) => {
        state.loadingRecentProperties = false;
        state.isRecentPropertiesError = true;
        state.recentProperties = [];
      });
  }
});

export const selectProperties = (state: RootState) => state.properties.properties;
export const selectLoadingProperties = (state: RootState) => state.properties.loadingProperties;
export const selectIsPropertiesError = (state: RootState) => state.properties.isPropertiesError;

export const selectRecentProperties = (state: RootState) => state.properties.recentProperties;
export const selectLoadingRecentProperties = (state: RootState) => state.properties.loadingRecentProperties;
export const selectIsRecentPropertiesError = (state: RootState) => state.properties.isRecentPropertiesError;

export default propertiesSlice.reducer;
