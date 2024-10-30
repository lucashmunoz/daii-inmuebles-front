import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import api, { API_HOST } from "../api/api";
import { endpoints } from "../api/endpoints";

interface RentalsState {
  userId: string
  userStatus: "INITIAL" | "SUCCESS" | "ERROR" | "LOADING"
}

const initialState: RentalsState = {
  userId: "",
  userStatus: "INITIAL"
};

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try{
      const response = await api.get(`${API_HOST}${endpoints.user}`);
      return response.data.id as string;
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.userStatus = "LOADING";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userStatus = "SUCCESS";
        state.userId = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.userStatus = "ERROR";
      });
  }
});

export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserStatus = (state: RootState) => state.user.userStatus;

export default userSlice.reducer;
