"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegionsSchema } from "./types/regions";
import { VacancyRegion } from "@/app/lib/types";

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
            console.log("setRegionsData: ");
            const regionMock: VacancyRegion = {
                code: "all",
                name: "Вся Россия",
                shortName: "",
                text: "",
                key: "",
            };
            state.data = action.payload;
            state.isLoading = false;
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
