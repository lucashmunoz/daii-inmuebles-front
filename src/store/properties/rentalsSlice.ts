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
  rentalsStatus: "SUCCESS" | "ERROR" | "LOADING"
}

const initialState: RentalsState = {
  rentals: [],
  rentalProcesses: [],
  rentalsStatus: "LOADING"
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
  userId: number
}

export const createRentProcess = createAsyncThunk(
  "rentals/createRentProcess",
  async ({ propertyId, userId }: CreateRentProcessParams, { rejectWithValue }) => {
    const createRentProcessUrl = `${API_HOST}${endpoints.rentProcess}/${propertyId}`;
    try {
      const response = await api.post(createRentProcessUrl, null, {
        headers: {
          "userId": userId
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.rentalsStatus = "LOADING";
        state.rentals = [];
        state.rentalProcesses = [];
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.rentalsStatus = "SUCCESS";
        state.rentals = action.payload.rentals;
        state.rentalProcesses = action.payload.rentalProcesses;
      })
      .addCase(fetchRentals.rejected, (state) => {
        state.rentalsStatus = "ERROR";
        state.rentals = [];
        state.rentalProcesses = [];
      })
      .addCase(createRentProcess.pending, (state) => {
        state.rentalsStatus = "LOADING";
      })
      .addCase(createRentProcess.fulfilled, (state, action) => {
        state.rentalsStatus = "SUCCESS";
        state.rentalProcesses.push(action.payload);
      })
      .addCase(createRentProcess.rejected, (state) => {
        state.rentalsStatus = "ERROR";
      });
  }
});

export const selectRentals = (state: RootState) => state.rentals.rentals || [];
export const selectRentalProcesses = (state: RootState) => state.rentals.rentalProcesses || [];
export const selectRentalsStatus = (state: RootState) => state.rentals.rentalsStatus;

export default rentalsSlice.reducer;
