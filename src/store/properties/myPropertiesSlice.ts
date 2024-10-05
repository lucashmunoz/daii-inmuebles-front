import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST, currentUserId } from "../../api/api";
import { Property } from "../../models/property";

interface MyPropertiesState {
  myProperties: Property[],
  myPropertiesStatus: "SUCCESS" | "ERROR" | "LOADING",
  togglePropertyActiveStatus: "NOT_INITIALIZED" | "ERROR" | "LOADING",
  totalMyPropertiesPages: number
}

const initialState: MyPropertiesState = {
  myProperties: [],
  myPropertiesStatus: "LOADING",
  togglePropertyActiveStatus: "NOT_INITIALIZED",
  totalMyPropertiesPages: 0
};

interface FetchMyPropertiesParams {
  page: string
}

export const fetchMyProperties = createAsyncThunk(
  "users/fetchMyProperties",
  async ({ page }:FetchMyPropertiesParams, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("propertyOwnerId", currentUserId);

    const pageQuery = `page=${page ? Number(page) - 1 : "0"}`;
    const sizeQuery = "size=4";

    const queries = [
      pageQuery,
      sizeQuery
    ].filter(query => query !== "").join("&");

    try{
      const response = await api.get(
        `${API_HOST}${endpoints.properties}?${queries}`,
        {
          params
        }
      );
      return {
        myProperties: response.data.content as Property[],
        totalPages: response.data.totalPages
      };
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

interface TogglePropertyActiveStatusPayload {
  propertyId: number
  updatedProperty: Property
}

export const togglePropertyActiveStatus = createAsyncThunk(
  "users/togglePropertyActiveStatus",
  async ({ propertyId, updatedProperty }: TogglePropertyActiveStatusPayload, { rejectWithValue }) => {
    try{
      await api.patch(
        `${API_HOST}${endpoints.properties}/${propertyId}`,
        {
          ...updatedProperty
        }
      );

      return {
        propertyId, updatedProperty
      };
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const myPropertiesSlice = createSlice({
  name: "myProperties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProperties.pending, (state) => {
        state.myPropertiesStatus = "LOADING";
        state.myProperties = [];
        state.totalMyPropertiesPages = 0;
      })
      .addCase(fetchMyProperties.fulfilled, (state, action) => {
        state.myPropertiesStatus = "SUCCESS";
        state.myProperties = action.payload.myProperties;
        state.totalMyPropertiesPages = action.payload.totalPages;
      })
      .addCase(fetchMyProperties.rejected, (state) => {
        state.myPropertiesStatus = "ERROR";
        state.myProperties = [];
        state.totalMyPropertiesPages = 0;
      })
      .addCase(togglePropertyActiveStatus.pending, (state) => {
        state.togglePropertyActiveStatus = "LOADING";
      })
      .addCase(togglePropertyActiveStatus.fulfilled, (state, action) => {
        const { propertyId, updatedProperty } = action.payload;

        state.togglePropertyActiveStatus = "NOT_INITIALIZED";
        state.myProperties = state.myProperties.map(property => {
          if (propertyId === property.id) {
            return updatedProperty;
          }
          return property;
        });
      })
      .addCase(togglePropertyActiveStatus.rejected, (state) => {
        state.togglePropertyActiveStatus = "ERROR";
      });
  }
});

export const selectMyProperties = (state: RootState) => state.myProperties.myProperties;
export const selectMyPropertiesStatus = (state: RootState) => state.myProperties.myPropertiesStatus;
export const selectTogglePropertyActiveStatus = (state: RootState) => state.myProperties.togglePropertyActiveStatus;
export const selectTotalMyPropertiesPages = (state: RootState) => state.myProperties.totalMyPropertiesPages;

export default myPropertiesSlice.reducer;
