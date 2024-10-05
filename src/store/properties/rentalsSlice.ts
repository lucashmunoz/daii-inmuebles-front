import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";
import { RentProcessStatus, RentStatus, UserRoleType } from "../../models/rentals";

interface Rental {
  id: number,
  property: Property
  status: RentStatus
}

interface RentProcess {
  id: number,
  property: Property
  status: RentProcessStatus
}

interface RentalsState {
  rentals: Rental[]
  rentalProcesses: RentProcess[]
  rentalStatus: "SUCCESS" | "ERROR" | "LOADING" | "NOT_INITIALIZED"
}

const initialState: RentalsState = {
  rentals: [],
  rentalProcesses: [],
  rentalStatus: "NOT_INITIALIZED"
};

interface FetchRentalsParams {
  role: UserRoleType
}

export const fetchRentals = createAsyncThunk(
  "users/fetchRentals",
  async ({ role }: FetchRentalsParams, { rejectWithValue }) => {
    const fetchRentalsUrl = `${API_HOST}${endpoints.rentals}?role=${role}`;
    try{
      const response = await api.get(fetchRentalsUrl);
      const { rentals, rent_processes } = response.data;
      return {
        rentals,
        rentalProcesses: rent_processes
      };
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

interface CreateRentProcessParams {
  propertyId: number,
}

export const createRentProcess = createAsyncThunk(
  "rentals/createRentProcess",
  async ({ propertyId }: CreateRentProcessParams, { rejectWithValue }) => {
    const createRentProcessUrl = `${API_HOST}${endpoints.rentProcess}/${propertyId}`;
    try {
      return await api.post(createRentProcessUrl);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    resetRentalsState: (state) => {
      state.rentalStatus = "NOT_INITIALIZED";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.rentalStatus = "LOADING";
        state.rentals = [];
        state.rentalProcesses = [];
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.rentalStatus = "SUCCESS";
        state.rentals = action.payload.rentals;
        state.rentalProcesses = action.payload.rentalProcesses;
      })
      .addCase(fetchRentals.rejected, (state) => {
        state.rentalStatus = "ERROR";
        state.rentals = [];
        state.rentalProcesses = [];
      })
      .addCase(createRentProcess.pending, (state) => {
        state.rentalStatus = "LOADING";
      })
      .addCase(createRentProcess.fulfilled, (state) => {
        state.rentalStatus = "SUCCESS";
      })
      .addCase(createRentProcess.rejected, (state) => {
        state.rentalStatus = "ERROR";
      });
  }
});

export const { resetRentalsState } = rentalsSlice.actions;

export const selectRentals = (state: RootState) => state.rentals.rentals || [];
export const selectRentalProcesses = (state: RootState) => state.rentals.rentalProcesses || [];
export const selectRentalStatus = (state: RootState) => state.rentals.rentalStatus;

export default rentalsSlice.reducer;
