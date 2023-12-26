"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegionsSchema } from "./types/regions";
import { VacancyRegion } from "../../types";

const initialState: RegionsSchema = {
    isLoading: false,
    code: undefined,
    error: undefined,
    data: undefined,
};

export const regionsSlice = createSlice({
    name: "regions",
    initialState,
    reducers: {
        setRegionsData: (state, action: PayloadAction<VacancyRegion[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
    },
});


export const { actions: regionsActions } = regionsSlice;
export const { reducer: regionsReducer } = regionsSlice;

