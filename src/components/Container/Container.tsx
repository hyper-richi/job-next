"use client";
import React, { useEffect } from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import TitleCategory from "../TitleCategory/TitleCategory";
import Search from "../Search/Search";
import { ContainerProps } from "./Container.props";
import Finder from "../Finder/Finder";

import Counter from "../Counter/Counter";

const Container = ({
    statusUploadVacancies,
    statusUploadRegions,
    results,
    regions,
    totalPages,
    countVacancies,
    jobCategory,
    regionCode,
    offset,
    searchText,
}: ContainerProps) => {
    if (statusUploadVacancies === "200") {
        //   console.log("statusUploadVacancies: ", statusUploadVacancies);
    }

    if (statusUploadRegions === "SUCCESS") {
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
