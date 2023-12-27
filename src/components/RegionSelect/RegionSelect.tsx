"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./RegionSelect.module.scss";
import { Select } from "@mantine/core";
import { VacancyRegion } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { useSelector } from "react-redux";
import { selectRegionsData } from "@/app/lib/store/features/regions/selectors/selectRegionsData";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";


const RegionSelect = () => {
    const regionCodeStorage = localStorage.getItem("regionCode") || "0000000000000";

    const [regionCodeState, setRegionCodeStorage] = useState(regionCodeStorage);
    const [searchValue, setSearchValue] = useState("");
    const { replace } = useRouter();

    const searchParams = useSearchParams();
    const SearchParams = new URLSearchParams(searchParams);

    const regionsData = useSelector(selectRegionsData);

    // const regionCode = searchParams.get("regionCode");

    /*  useEffect(() => {
        const value = localStorage.getItem("regionCode") || "";
        setRegionCodeStorage(value);
    }, []); */

    const regionMock: VacancyRegion = {
        code: "0000000000000",
        name: "Вся Россия",
        shortName: "",
        text: "",
        key: "",
    };

    const arrRegionsName = useMemo(() => {
        if (regionsData) {
            return [regionMock, ...regionsData]?.map((item) => {
                return { value: item.code, label: item.name };
            });
        } else {
            return [{ value: regionMock.code, label: regionMock.name }];
        }
    }, [regionsData]);

    function handleChange(value: string | null) {
        if (!value) {
            localStorage.setItem("regionCode", "0000000000000");
        }
        if (value) {
            /// SearchParams.set("regionCode", value);
            //  replace(`?${SearchParams.toString()}`);
            localStorage.setItem("regionCode", value);
        }
    }

    return (
        <div className={styles.filters__selects}>
            <Select
                // disabled
                value={regionCodeStorage}
                onChange={(value) => handleChange(value)}
                searchable
                clearable
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                data={arrRegionsName}
                placeholder="Локация"
                nothingFoundMessage="Nothing found..."
                comboboxProps={{ transitionProps: { transition: "pop", duration: 500 } }}
            />
        </div>
    );
};

export default RegionSelect;
