"use client";
import { memo, useEffect, useMemo, useState } from "react";
import styles from "./RegionName.module.scss";
import { IRegion } from "@/app/lib/types";

const RegionName = ({ regions, regionCodeParams }: { regions?: IRegion[]; regionCodeParams: string | null }) => {
    // console.log('regionCodeParams: ', regionCodeParams);
    const regionCodeStorage = localStorage.getItem("regionCode");
    // const [regionCode, setRegionCode] = useState(regionCodeStorage);

    console.log("regionCodeStorage: ", regionCodeStorage);

    useEffect(() => {
        if (!regionCodeStorage) {
            localStorage.setItem("regionCode", "all");
        }
    }, []);

    /*  useEffect(() => {
        setRegionCode(regionCodeStorage);
    }, [regionCodeStorage]); */

    const regionName = useMemo(() => {
        if (regions) {
            return regions?.find((item) => item.code === regionCodeStorage)?.name || "Россия";
        } else return "Россия";
    }, [regions, regionCodeStorage]);

    return <span className={styles["city-name"]}>{regionName}</span>;
};

export default RegionName;
