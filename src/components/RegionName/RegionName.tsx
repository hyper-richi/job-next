"use client";
import { memo, useMemo } from "react";
import styles from "./RegionName.module.scss";
import { VacancyRegion } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";

const RegionName = ({ regions }: { regions: VacancyRegion[] }) => {
    const searchParams = useSearchParams();
    const regionCode = searchParams.get("regionCode");
    const regionCodeStorage = localStorage.getItem("regionCode");

    if (!regionCodeStorage) {
        localStorage.setItem("regionCode", "all");
    }

    const regionName = useMemo(() => {
        if (regions) {
            return regions?.find((item) => item.code === (regionCode || regionCodeStorage))?.name || "Вся Россия";
        } else return "Вся Россия";
    }, [regions, regionCode, regionCodeStorage]);

    return <span className={styles["city-name"]}>{regionName}</span>;
};

export default memo(RegionName);
