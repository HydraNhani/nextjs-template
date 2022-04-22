import layoutSlice from "@actions/layout";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    devTools: process.env.NODE_ENV == "development" ? true : false,
    reducer: {
        layout: layoutSlice.reducer
    }
});



export const actions = {
    ...layoutSlice.actions
};