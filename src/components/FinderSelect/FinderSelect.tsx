"use client";
import React, { useState } from "react";
import styles from "./FinderSelect.module.scss";
import { Select } from "@mantine/core";
import { VacancyRegion } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { useSelector } from "react-redux";
import { selectRegionsData } from "@/app/lib/store/features/regions/selectors/selectRegionsData";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";

const FinderSelect = ({ totalPages, regions }: { totalPages: number; regions: VacancyRegion[] }) => {
    const [searchValue, setSearchValue] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const jobCategory = searchParams.get("jobCategory");
    const searchText = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");
    const regionCodeStorage = localStorage.getItem("regionCode") || "all";

    const arrRegions = regions?.map((item) => {
        return { value: item.code, label: item.name };
    });

    function handleChange(value: string) {
        dispatch(vacanciesActions.startLoadingVacancies());
        localStorage.setItem("regionCode", value);
        let url = `${pathname}?`;

        if (jobCategory) {
            url = url + `jobCategory=${jobCategory}&`;
        }
        if (value) {
            url = url + `regionCode=${value}&`;
        }
        if (offset) {
            url = url + `offset=${0}&`;
        }
        if (searchText) {
            url = url + `text=${searchText}`;
        }
        router.push(url);
    }

    return (
        <div className={styles.filters__selects}>
            <Select
                // disabled
                value={regionCode || regionCodeStorage}
                onChange={(value) => handleChange(value || "all")}
                searchable
                // clearable
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                data={arrRegions}
                placeholder="Локация"
                nothingFoundMessage="Нет совпадений..."
                comboboxProps={{ transitionProps: { transition: "pop", duration: 500 } }}
            />
        </div>
    );
};

export default FinderSelect;
