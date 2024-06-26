import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postToWatchList = createAsyncThunk(
  "watchList/postWatchList",
  async (data) => {
    console.log(data)
    try {
      const responsePost = await axios.post(
        "http://127.0.0.1:5000/watchlist",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseGet = await axios.get("http://127.0.0.1:5000/watchlist")

      // our watch list global state
      return responseGet.data;
    } catch (error) {
        console.log("Error: failed to post data to server", error)
    }
  }
);

// initial state
const initialState = {
    watchList: [],
    totalItems: 0,
    status: "idle", // "loading", "succeeded", "failed"
    error: null
}

export const watchListSlice = createSlice({
    name: "watch list",
    initialState,
    reducers: {},
    // async reducers
    extraReducers: (builder) => {
        builder
            .addCase(postToWatchList.pending, (state) => {
                state.status = "loading"
            })
            .addCase(postToWatchList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.watchList = action.payload;
                state.totalItems = action.payload.length;
            })
            .addCase(postToWatchList.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message;
            })

    }
})

export default watchListSlice.reducer;

