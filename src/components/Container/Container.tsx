"use client";
import React, { useEffect } from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import TitleCategory from "../TitleCategory/TitleCategory";
import Search from "../Search/Search";
import { ContainerProps } from "./Container.props";
import Finder from "../Finder/Finder";

import Counter from "../Counter/Counter";
import { useAppDispatch } from "@/app/lib/hooks";
import { regionsActions } from "@/app/lib/features/regions/regionsSlice";
import { vacanciesActions } from "@/app/lib/features/vacancies/vacanciesSlice";

const Container = ({
    statusUploadVacancies,
    statusUploadRegions,
    results,
    regions,
    jobCategory,
    regionCode,
    offset,
    searchText,
}: ContainerProps) => {
    const dispatch = useAppDispatch();

    if (statusUploadVacancies === "200") {
        //   console.log("statusUploadVacancies: ", statusUploadVacancies);
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
            />
        </>
    );
};

export default Container;
