import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";

interface BookmarksState {
  bookmarkedProperties: Property[]
  bookmarksStatus: "SUCCESS" | "ERROR" | "LOADING"
  deleteBookmarkStatus: "NOT_INITIALIZED" | "ERROR" | "LOADING"
}

const initialState: BookmarksState = {
  bookmarkedProperties: [],
  bookmarksStatus: "LOADING",
  deleteBookmarkStatus: "NOT_INITIALIZED"
};

export const fetchBookmarkedProperties = createAsyncThunk(
  "users/fetchBookmarkedProperties",
  async (_, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("page", "0");

    try{
      const response = await api.get(
        `${API_HOST}${endpoints.bookmark}`, {
          params
        }
      );
      return response.data.content as Property[];
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

interface DeleteBookmarkPayload {
  propertyId: number
}

export const deleteBookmark = createAsyncThunk(
  "users/deleteBookmark",
  async ({ propertyId }: DeleteBookmarkPayload, { rejectWithValue }) => {
    const fetchParams = new URLSearchParams();
    fetchParams.append("page", "0");

    try{
      await api.delete(`${API_HOST}/properties/${propertyId}/favorites`);

      const response = await api.get(
        `${API_HOST}${endpoints.bookmark}`, {
          params: fetchParams
        }
      );

      return response.data.content as Property[];
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarkedProperties.pending, (state) => {
        state.bookmarksStatus = "LOADING";
        state.bookmarkedProperties = [];
      })
      .addCase(fetchBookmarkedProperties.fulfilled, (state, action) => {
        state.bookmarksStatus = "SUCCESS";
        state.bookmarkedProperties = action.payload;
      })
      .addCase(fetchBookmarkedProperties.rejected, (state) => {
        state.bookmarksStatus = "ERROR";
        state.bookmarkedProperties = [];
      })
      .addCase(deleteBookmark.pending, (state) => {
        state.deleteBookmarkStatus = "LOADING";
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.deleteBookmarkStatus = "NOT_INITIALIZED";
        state.bookmarksStatus = "SUCCESS";
        state.bookmarkedProperties = action.payload;
      })
      .addCase(deleteBookmark.rejected, (state) => {
        state.deleteBookmarkStatus = "ERROR";
      });
  }
});

export const selectBookmarkedProperties = (state: RootState) => state.bookmarks.bookmarkedProperties || [];
export const selectBookmarksStatus = (state: RootState) => state.bookmarks.bookmarksStatus;
export const selectDeleteBookmarkStatus = (state: RootState) => state.bookmarks.deleteBookmarkStatus;

export default bookmarksSlice.reducer;
