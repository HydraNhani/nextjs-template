import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Mode } from "@types";

const initialState = "dark";

const modeSlice = createSlice({
    name: "mode",
    initialState: initialState as Mode,
    reducers: {
        loadMode: (state, action: PayloadAction<Mode>) => action.payload,
        changeMode: (state) => state == "dark" ? "light" : "dark"
    }
});

export default modeSlice;