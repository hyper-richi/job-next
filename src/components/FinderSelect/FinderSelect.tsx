"use client";
import React, { useEffect, useState } from "react";
import styles from "./FinderSelect.module.scss";
import { Select } from "@mantine/core";
import { VacancyRegion } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { useSelector } from "react-redux";
import { selectRegionsData } from "@/app/lib/store/features/regions/selectors/selectRegionsData";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";

const FinderSelect = ({ totalPages }: { totalPages: number }) => {
    const [regionCodeStorage, setRegionCodeStorage] = useState("");

    const [searchValue, setSearchValue] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const regionsData = useSelector(selectRegionsData);

    const jobCategory = searchParams.get("jobCategory");
    const searchText = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");

    /*  useEffect(() => {
        const value = localStorage.getItem("regionCode") || "";
        setRegionCodeStorage(value);
    }, []); */

    const arrRegionsName = regionsData?.map((item) => {
        return { value: item.code, label: item.name };
    });

    /*  const getSelectVacancies = (formData: FormData) => {
        console.log("formData: ", formData);
    }; */

    function handleChange(value: string | null) {
        dispatch(vacanciesActions.startLoadingVacancies());

        if (!value) {
            // localStorage.setItem("regionCode", "");
        }

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
                value={regionCode}
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

export default FinderSelect;
