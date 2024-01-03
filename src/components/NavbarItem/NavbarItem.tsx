import { CategoryVacancy, Mods } from "@/app/lib/types";
import styles from "./NavbarItem.module.scss";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import SpinnerIcon from "../../../public/images/svg/spinnerIcon.svg";

const NavbarItem = ({ categoryVacancy, isMobile }: { categoryVacancy: CategoryVacancy; isMobile?: boolean }) => {
    const { jobCategory } = useParams();
    const pathname = usePathname();
    const regionCode = useSearchParams().get("regionCode");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    if (categoryVacancy.jobCategory === "/vacancies") {
        return null;
    }

    let url = `/vacancies/${categoryVacancy.jobCategory}?`;

    if (regionCode) {
        url = url + `regionCode=${regionCode}`;
    }

    const urlDecode = decodeURIComponent(url + "&offset=0");

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
            href={urlDecode}
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
