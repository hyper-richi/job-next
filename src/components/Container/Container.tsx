"use client";
import React from "react";
import { ContainerProps } from "./Container.props";
import Finder from "../Finder/Finder";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";
import { regionsActions } from "@/app/lib/store/features/regions/regionsSlice";
import { VacancyRegion } from "@/app/lib/types";

const Container = ({
    statusUploadVacancies,
    statusUploadRegions,
    results,
    regions,
    jobCategory,
    regionCode,
    offset,
    searchText,
    totalPages,
}: ContainerProps) => {
    const dispatch = useAppDispatch();

    if (statusUploadVacancies === "200") {
        dispatch(vacanciesActions.stopLoadingVacancies());
    }

    if (statusUploadRegions === "SUCCESS") {
        if (regions) {
            dispatch(regionsActions.setRegionsData(regions));
        }
        dispatch(regionsActions.stopLoading());
    }

    return (
        <>
            <Finder
                regions={regions}
                results={results}
                jobCategory={jobCategory}
                regionCode={regionCode}
                offset={offset}
                searchText={searchText}
                totalPages={totalPages}
            />
        </>
    );
};

export default Container;
