import { CategoryVacancy } from "@/app/lib/types";
import styles from "./NavbarItem.module.scss";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const NavbarItem = ({ categoryVacancy }: { categoryVacancy: CategoryVacancy }) => {
    const { jobCategory } = useParams();
    const regionCode = useSearchParams().get("regionCode") || "all";

    if (categoryVacancy.jobCategory === "/vacancies") {
        return null;
    }

    let url = `/vacancies/${categoryVacancy.jobCategory}?`;

    if (regionCode) {
        url = url + `regionCode=${regionCode}`;
    }
    /*  if (regionCode) {
        url = url + `regionCode=${regionCode}`;
    } */
    const urlDecode = decodeURIComponent(url + "&offset=0");

    return (
        <Link
            key={categoryVacancy.jobCategory}
            className={clsx(styles.navbar__links, jobCategory === categoryVacancy.jobCategory && styles["navbar__links--active"])}
            href={urlDecode}>
            {categoryVacancy.icon}
            <span className={styles["links-name"]}>{categoryVacancy.name}</span>
        </Link>
    );
};

export default NavbarItem;
