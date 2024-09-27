import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";

interface MyPropertiesState {
  myProperties: Property[],
  myPropertiesStatus: "SUCCESS" | "ERROR" | "LOADING"
  togglePropertyActiveStatus: "NOT_INITIALIZED" | "ERROR" | "LOADING"
}

const initialState: MyPropertiesState = {
  myProperties: [],
  myPropertiesStatus: "LOADING",
  togglePropertyActiveStatus: "NOT_INITIALIZED"
};

export const fetchMyProperties = createAsyncThunk(
  "users/fetchMyProperties",
  async (_, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("propertyOwnerId", "1");

    try{
      const response = await api.get(
        `${API_HOST}${endpoints.properties}`,
        {
          params
        }
      );
      return response.data.content as Property[];
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
      await api.put(
        `${API_HOST}${endpoints.properties}/${propertyId}`,
        {
          ...updatedProperty,
          /* Momentaneamente enviando un address porque la api lo tiene como campo obligatorio (aunque no exista el campo). */
          address: "-"
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
      })
      .addCase(fetchMyProperties.fulfilled, (state, action) => {
        state.myPropertiesStatus = "SUCCESS";
        state.myProperties = action.payload;
      })
      .addCase(fetchMyProperties.rejected, (state) => {
        state.myPropertiesStatus = "ERROR";
        state.myProperties = [];
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

export default myPropertiesSlice.reducer;
