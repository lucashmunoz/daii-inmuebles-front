import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";

interface RentalsState {
  districts: string[]
  districtsStatus: "SUCCESS" | "ERROR" | "LOADING"
}

const initialState: RentalsState = {
  districts: [],
  districtsStatus: "LOADING"
};

export const fetchDistricts = createAsyncThunk(
  "users/fetchDistricts",
  async (_, { rejectWithValue }) => {
    const fetchDistrictsUrl = `${API_HOST}${endpoints.districts}`;
    try{
      const response = await api.get(fetchDistrictsUrl);
      return response.data;
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const districtsSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.districtsStatus = "LOADING";
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districtsStatus = "SUCCESS";

        state.districts = [...action.payload].sort();
      })
      .addCase(fetchDistricts.rejected, (state) => {
        state.districtsStatus = "ERROR";
      });
  }
});

export const selectDistricts = (state: RootState) => state.districts.districts || [];
export const selectDistrictsStatus = (state: RootState) => state.districts.districtsStatus;
export default districtsSlice.reducer;
