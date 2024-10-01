import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property, PropertyType, SortBy, SurfaceType } from "../../models/property";

export interface Filters {
  sort: SortBy
  type: PropertyType
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
  districts: string
  minLat: string
  maxLat: string
  minLon: string
  maxLon: string
}

interface PropertyState {
  loadingProperties: boolean
  properties: Property[],
  isPropertiesError: boolean,
  totalPropertiesPages: number,

  loadingRecentProperties: boolean
  recentProperties: Property[],
  isRecentPropertiesError: boolean

  createPropertyState: "LOADING" | "CREATED" | "ERROR" | "NOT_INITIALIZED";
  createdPropertyId: number
}

const initialState: PropertyState = {
  loadingProperties: true,
  properties: [],
  isPropertiesError: false,
  totalPropertiesPages: 0,

  loadingRecentProperties: true,
  recentProperties: [],
  isRecentPropertiesError: false,

  createPropertyState: "NOT_INITIALIZED",
  createdPropertyId: 0
};

interface FetchPropertiesParams {
  sortBy?: SortBy,
  filters?: Partial<Filters>
  page: string
}

export const fetchProperties = createAsyncThunk(
  "users/fetchProperties",
  async ({ sortBy, filters = {}, page }: FetchPropertiesParams, { rejectWithValue }) => {
    const sortByQuery = sortBy ? `sortBy=${sortBy}` : "";

    const {
      type,
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
      surfaceType,
      districts,
      minLat,
      maxLat,
      minLon,
      maxLon
    } = filters;

    const propertyTypeQuery = type ? `propertyType=${type}` : "";
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
    const districtsQuery = districts ? `districts=${districts}` : "";
    const minLatQuery = minLat ? `minLat=${minLat}` : "";
    const maxLatQuery = maxLat ? `maxLat=${maxLat}` : "";
    const minLonQuery = minLon ? `minLon=${minLon}` : "";
    const maxLonQuery = maxLon ? `maxLon=${maxLon}` : "";
    const pageQuery = `page=${page ? Number(page) - 1 : "0"}`;
    const sizeQuery = "size=60";

    const queries = [
      sortByQuery,
      propertyTypeQuery,
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
      maxSurfaceTotalQuery,
      districtsQuery,
      minLatQuery,
      maxLatQuery,
      minLonQuery,
      maxLonQuery,
      pageQuery,
      sizeQuery
    ].filter(query => query !== "").join("&");

    const fetchPropertiesUrl = `${API_HOST}${endpoints.properties}?${queries}`;

    try{
      const response = await api.get(fetchPropertiesUrl);
      return {
        properties: response.data.content as Property[],
        totalPages: response.data.totalPages as number
      };
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

interface CreateNewPropertyParams {
  property: Pick<Property,
  "beds" |
  "zipcode" |
  "bathrooms" |
  "country" |
  "city" |
  "state" |
  "district" |
  "rooms" |
  "title" |
  "description" |
  "latitude" |
  "longitude" |
  "images" |
  "address" |
  "price" |
  "garages" |
  "type" |
  "surface_covered" |
  "surface_total"
  >
}

export const createNewProperty = createAsyncThunk(
  "users/createNewProperty",
  async ({ property }: CreateNewPropertyParams, { rejectWithValue }) => {
    const createNewPropertyUrl = `${API_HOST}${endpoints.properties}`;
    try{
      const respose = await api.post(createNewPropertyUrl, property);
      return respose.data.id as number;
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
        state.totalPropertiesPages = 0;
        state.properties = [];
        state.isPropertiesError = false;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loadingProperties = false;
        state.isPropertiesError = false;
        state.properties = action.payload.properties;
        state.totalPropertiesPages = action.payload.totalPages;
      })
      .addCase(fetchProperties.rejected, (state) => {
        state.loadingProperties = false;
        state.totalPropertiesPages = 0;
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
      })
      .addCase(createNewProperty.pending, (state) => {
        state.createPropertyState = "LOADING";
      })
      .addCase(createNewProperty.fulfilled, (state, action) => {
        state.createPropertyState = "CREATED";
        state.createdPropertyId = action.payload;
      })
      .addCase(createNewProperty.rejected, (state) => {
        state.createPropertyState = "ERROR";
      });
  }
});

export const selectProperties = (state: RootState) => state.properties.properties;
export const selectLoadingProperties = (state: RootState) => state.properties.loadingProperties;
export const selectIsPropertiesError = (state: RootState) => state.properties.isPropertiesError;
export const selectTotalPropertiesPages = (state: RootState) => state.properties.totalPropertiesPages;

export const selectRecentProperties = (state: RootState) => state.properties.recentProperties;
export const selectLoadingRecentProperties = (state: RootState) => state.properties.loadingRecentProperties;
export const selectIsRecentPropertiesError = (state: RootState) => state.properties.isRecentPropertiesError;

export const selectCreatedPropertyId = (state: RootState) => state.properties.createdPropertyId;
export const selectCreatePropertyState = (state: RootState) => state.properties.createPropertyState;

export default propertiesSlice.reducer;
