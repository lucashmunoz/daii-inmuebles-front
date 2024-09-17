import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property } from "../../models/property";

type ToggleBookmarkStatus = "NOT_INITIALIZED" | "ADDED" | "DELETED" | "ERROR";

interface BookmarksState {
  bookmarkedProperties: Property[]
  bookmarksStatus: "SUCCESS" | "ERROR" | "LOADING"
  deleteBookmarkStatus: "NOT_INITIALIZED" | "ERROR" | "LOADING"
  toggleBookmarkStatus: ToggleBookmarkStatus
};

const initialState: BookmarksState = {
  bookmarkedProperties: [],
  bookmarksStatus: "LOADING",
  deleteBookmarkStatus: "NOT_INITIALIZED",
  toggleBookmarkStatus: "NOT_INITIALIZED"
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

interface ToggleBookmarkPayload {
  propertyId: number;
  operation: "ADD" | "DELETE";
}

export const toggleBookmark = createAsyncThunk(
  "users/toggleBookmark",
  async ({ propertyId, operation }: ToggleBookmarkPayload, { rejectWithValue }) => {
    try {
      if (operation === "ADD") {
        await api.post(`${API_HOST}/properties/${propertyId}/favorites`);
        return {
          operation
        };
      }

      await api.delete(`${API_HOST}/properties/${propertyId}/favorites`);
      return {
        operation
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    finishToggleBookmarkUpdates: (state) => {
      state.toggleBookmarkStatus = "NOT_INITIALIZED";
    }
  },
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
      })
      .addCase(toggleBookmark.pending, (state) => {
        state.toggleBookmarkStatus = "NOT_INITIALIZED";
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.toggleBookmarkStatus = action.payload.operation as ToggleBookmarkStatus;
      })
      .addCase(toggleBookmark.rejected, (state) => {
        state.toggleBookmarkStatus = "NOT_INITIALIZED";
      });
  }
});

export const selectBookmarkedProperties = (state: RootState) => state.bookmarks.bookmarkedProperties || [];
export const selectBookmarksStatus = (state: RootState) => state.bookmarks.bookmarksStatus;
export const selectDeleteBookmarkStatus = (state: RootState) => state.bookmarks.deleteBookmarkStatus;
export const selectToggleBookmarkStatus = (state: RootState) => state.bookmarks.toggleBookmarkStatus;

export const { finishToggleBookmarkUpdates } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
