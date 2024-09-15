import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";

interface MyPropertiesState {
  myProperties: Property[],
  myPropertiesStatus: "SUCCESS" | "ERROR" | "LOADING"

}

const initialState: MyPropertiesState = {
  myProperties: [],
  myPropertiesStatus: "LOADING"
};

export const fetchMyProperties = createAsyncThunk(
  "users/fetchMyProperties",
  async (_, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("userId", "1");

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
      });
  }
});

export const selectMyProperties = (state: RootState) => state.myProperties.myProperties;
export const selectMyPropertiesStatus = (state: RootState) => state.myProperties.myPropertiesStatus;

export default myPropertiesSlice.reducer;
