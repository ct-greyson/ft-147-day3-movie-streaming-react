import { configureStore } from "@reduxjs/toolkit"
import wishListReducer from './features/wishListSlice'
import watchListReducer from "./features/watchListSlice"

export const store = configureStore({
    reducer: {
        //name of our state
        wishList: wishListReducer,
        watchList: watchListReducer,
    }
})