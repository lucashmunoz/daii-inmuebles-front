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
  totalBookmarksPages: number
};

const initialState: BookmarksState = {
  bookmarkedProperties: [],
  bookmarksStatus: "LOADING",
  deleteBookmarkStatus: "NOT_INITIALIZED",
  toggleBookmarkStatus: "NOT_INITIALIZED",
  totalBookmarksPages: 0
};

interface FetchBookmarkedPropertiesParams {
  page: string;
}

export const fetchBookmarkedProperties = createAsyncThunk(
  "bookmarks/fetchBookmarkedProperties",
  async ({ page }: FetchBookmarkedPropertiesParams, { rejectWithValue }) => {
    const pageQuery = `page=${page ? Number(page) - 1 : "0"}`;
    const sizeQuery = "size=4";

    const queries = [
      pageQuery,
      sizeQuery
    ].filter(query => query !== "").join("&");

    try {
      const response = await api.get(
        `${API_HOST}${endpoints.bookmark}?${queries}`
      );
      return {
        bookmarkedProperties: response.data.content as Property[],
        totalPages: response.data.totalPages
      };
    } catch (error) {
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
        state.totalBookmarksPages = 0;
      })
      .addCase(fetchBookmarkedProperties.fulfilled, (state, action) => {
        state.bookmarksStatus = "SUCCESS";
        state.bookmarkedProperties = action.payload.bookmarkedProperties;
        state.totalBookmarksPages = action.payload.totalPages;
      })
      .addCase(fetchBookmarkedProperties.rejected, (state) => {
        state.bookmarksStatus = "ERROR";
        state.bookmarkedProperties = [];
        state.totalBookmarksPages = 0;
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
        state.toggleBookmarkStatus = action.payload.operation === "ADD" ? "ADDED" : "DELETED";
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
export const selectTotalBookmarksPages = (state: RootState) => state.bookmarks.totalBookmarksPages;

export const { finishToggleBookmarkUpdates } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
