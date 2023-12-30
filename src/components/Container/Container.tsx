"use client";
import React, { useEffect, useState } from "react";
import { ContainerProps } from "./Container.props";
import Finder from "../Finder/Finder";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";
import { regionsActions } from "@/app/lib/store/features/regions/regionsSlice";
import { VacancyRegion } from "@/app/lib/types";
import { useRouter } from "next/router";
import { getRegions } from "@/app/lib/store/data";

const Container = ({
    statusUploadVacancies,
    vacancies,
    regions,
    jobCategory,
    regionCode,
    offset,
    searchText,
    totalPages,
}: ContainerProps) => {
    const dispatch = useAppDispatch();
    console.log("Container: ");

    if (statusUploadVacancies === "200") {
        dispatch(vacanciesActions.stopLoadingVacancies());
    }

    return (
        <>
            <Finder
                regions={regions}
                vacancies={vacancies}
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
