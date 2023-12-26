"use client";
import React, { useState } from "react";
import styles from "./FinderSelect.module.scss";
import { Select } from "@mantine/core";
import { VacancyRegion } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks";
import { useSelector } from "react-redux";
import { selectRegionsData } from "@/app/lib/features/regions/selectors/selectRegionsData";
import { vacanciesActions } from "@/app/lib/features/vacancies/vacanciesSlice";

interface PropsFinderSelect {
    regions?: VacancyRegion[];
}

// const arrRegion = [{1	'Республика Адыгея (Адыгея)'}]

const FinderSelect = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const regionsSelect = useSelector(selectRegionsData);

    const jobCategory = searchParams.get("jobCategory");
    const searchText = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");

    const [searchValue, setSearchValue] = useState("");
    const latitude = "56.827581";
    const longitude = "53.219494";
    // const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${"aa335a498cd141c2b240085fa3c2b025"}`;
    /* fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status.code === 200) {
                //  console.log("results:", data.results[0]);
            } else {
                console.log("Reverse geolocation request failed.");
            }
        })
        .catch((error) => console.error(error)); */

    // const arrAdress = results?.vacancies.map((item) => item.vacancy.addresses.address[0].location.split(",")[0]);
    // { value: 'react', label: 'React' }
    const arrRegionsName = regionsSelect?.map((item) => {
        return { value: item.code, label: item.name };
    });
    //.filter((value, index, array) => array.indexOf(value) === index);

    function handleChange(value: string | null) {
        dispatch(vacanciesActions.startLoadingVacancies());

        let url = `${pathname}?`;

        if (jobCategory) {
            url = url + `jobCategory=${jobCategory}&`;
        }
        if (value) {
            url = url + `regionCode=${value}&`;
        }
        if (offset) {
            url = url + `offset=${offset}&`;
        }
        if (searchText) {
            url = url + `text=${searchText}`;
        }
        router.push(url);
        // console.log("value: ", value);
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
