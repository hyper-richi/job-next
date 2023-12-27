"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacanciesShema } from "./types/vacancies";

const initialState: VacanciesShema = {
    vacanciesIsLoading: false,
};

export const vacanciesSlice = createSlice({
    name: "vacancies",
    initialState,
    reducers: {
        startLoadingVacancies: (state) => {
            state.vacanciesIsLoading = true;
        },
        stopLoadingVacancies: (state) => {
            state.vacanciesIsLoading = false;
        },
    },
});

export const { actions: vacanciesActions } = vacanciesSlice;
export const { reducer: vacanciesReducer } = vacanciesSlice;
