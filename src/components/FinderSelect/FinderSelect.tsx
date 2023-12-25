"use client";
import React, { useState } from "react";
import styles from "./FinderSelect.module.scss";
import { Select } from "@mantine/core";
import { Results, VacancyRegion } from "@/app/lib/types";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
interface PropsFinderSelect {
    regions?: VacancyRegion[];
}

// const arrRegion = [{1	'Республика Адыгея (Адыгея)'}]

const FinderSelect = ({ regions }: PropsFinderSelect) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const jobCategory = searchParams.get("jobCategory");
    const text = searchParams.get("text");
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
    const arrRegionsName = regions?.map((item) => {
        return { value: item.code, label: item.name };
    });
    //.filter((value, index, array) => array.indexOf(value) === index);

    function handleChange(value: string | null) {
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
        if (text) {
            url = url + `text=${text}`;
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
