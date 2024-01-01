"use client";
import React, { useMemo, useState } from "react";
import styles from "./RegionSelect.module.scss";
import { Select } from "@mantine/core";
import { VacancyRegion } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { useSelector } from "react-redux";
import { selectRegionsData } from "@/app/lib/store/features/regions/selectors/selectRegionsData";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";

const RegionSelect = ({ regions }: { regions: VacancyRegion[] }) => {
    const regionCodeStorage = localStorage.getItem("regionCode") || "all";
    const dispatch = useAppDispatch();

    const [searchValue, setSearchValue] = useState("");
    const { replace } = useRouter();

    const searchParams = useSearchParams();
    const SearchParams = new URLSearchParams(searchParams);

    const arrRegions = useMemo(() => {
        if (regions) {
            return regions?.map((item) => ({ value: item.code, label: item.name }));
        }
    }, [regions]);

    function handleChange(value: string | null) {
        if (value) {
            SearchParams.set("regionCode", value);
            replace(`?${SearchParams.toString()}`);
            localStorage.setItem("regionCode", value);
            dispatch(vacanciesActions.startLoadingVacancies());
        }
    }

    return (
        <div className={styles.filters__selects}>
            <Select
                // disabled
                value={regionCodeStorage}
                onChange={(value) => handleChange(value)}
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

export default RegionSelect;
