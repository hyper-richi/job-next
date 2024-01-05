"use client";
import { CategoryVacancy, Mods } from "@/app/lib/types";
import styles from "./NavbarItem.module.scss";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import SpinnerIcon from "../../../public/images/svg/spinnerIcon.svg";

const NavbarItem = ({ categoryVacancy, isMobile }: { categoryVacancy: CategoryVacancy; isMobile?: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { jobCategory } = useParams();
    const pathname = usePathname();

    const encodeSearchText = encodeURIComponent(useSearchParams().get("text") || "");

    const regionCodeStorage = localStorage.getItem("regionCode") || "all";

    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    if (categoryVacancy.jobCategory === "/vacancies") {
        return null;
    }

    let url = `/vacancies/${categoryVacancy.jobCategory}?offset=0&`;

    if (regionCodeStorage) {
        url = url + `regionCode=${regionCodeStorage}`;
    }

    if (encodeSearchText) {
        url = url + `&text=${encodeSearchText}`;
    }

    const handleCklick = () => {
        setIsLoading(true);
    };

    const mods: Mods = {
        [styles.navbar__icon__isMobile]: !isMobile,
        [styles.navbar__icon]: isMobile,
    };

    return (
        <Link
            key={categoryVacancy.jobCategory}
            className={clsx(styles.navbar__links, jobCategory === categoryVacancy.jobCategory && styles["navbar__links--active"])}
            href={url}
            onClick={handleCklick}>
            <div className={clsx(isMobile ? styles.navbar__name__mobile : styles.navbar__name)}>
                {categoryVacancy.icon}
                <span className={styles["links-name"]}>{categoryVacancy.name}</span>
            </div>
            {isLoading && <SpinnerIcon className={clsx(mods)} width="24" height="24" />}
        </Link>
    );
};

export default NavbarItem;
