"use client";
import React, { useCallback } from "react";
import BackIcon from "../../../public/images/svg/backIcon.svg";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./ButtonBack.module.scss";
import Link from "next/link";

const ButtonBack = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const jobCategory = searchParams.get("jobCategory");
    const searchText = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");
    // const jobCategory = searchParams.get("jobCategory");
    // const params = useParams<{ jobCategory: string }>();

    // let url = `/vacancies/${jobCategory}?region=${value}&offset=${offset}&text=${text}`;
    let url = `/vacancies?`;

    if (jobCategory) {
        url = url + `jobCategory=${jobCategory}&`;
    }
    if (regionCode) {
        url = url + `regionCode=${regionCode}&`;
    }
    if (offset) {
        url = url + `offset=${offset}&`;
    }

    if (searchText) {
        url = url + `text=${searchText}`;
    }

    const handleClick = useCallback(() => {
        router.push(url);
    }, [url]);

    return (
        /* <Link
            className={styles.vacancy__link}
            href={{
                pathname: `vacancies/${jobCategory}?text=${query}&offset=${offset}`,
            }}  target="_blank"
        >
            <BackIcon />
            Назад
        </Link> */
        <div className={styles.vacancy__info__back} onClick={handleClick}>
            <BackIcon />
            Назад
        </div>
    );
};

export default ButtonBack;
