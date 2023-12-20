"use client";
import React, { useState } from "react";
import styles from "./FinderSelect.module.scss";
import { Select } from "@mantine/core";
import { Results } from "@/app/lib/types";
interface PropsFinderSelect {
    results?: Results;
}

// const arrRegion = [{1	'Республика Адыгея (Адыгея)'}]

const FinderSelect = ({ results }: PropsFinderSelect) => {
    // console.log("results: ", results?.vacancies[0]);
    const [searchValue, setSearchValue] = useState("");
    const latitude = "56.827581";
    const longitude = "53.219494";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${"aa335a498cd141c2b240085fa3c2b025"}`;
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

    /* const arrRegion = results?.vacancies
        ?.map((item) => {
            console.log("item: ", item.vacancy);

            return item.vacancy.region?.name;
        })
        //.filter((value, index, array) => array.indexOf(value) === index);
        console.log('arrRegion: ', arrRegion); */

    return (
        <div className={styles.filters__selects}>
            <Select
                searchable
                clearable
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                data={["arrRegion"]}
                placeholder="Локация"
                nothingFoundMessage="Nothing found..."
                comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
            />
        </div>
    );
};

export default FinderSelect;
