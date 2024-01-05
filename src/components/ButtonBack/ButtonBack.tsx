"use client";
import React, { useCallback } from "react";
import BackIcon from "../../../public/images/svg/backIcon.svg";
import {   useRouter, useSearchParams } from "next/navigation";
import styles from "./ButtonBack.module.scss";

const ButtonBack = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const jobCategory = searchParams.get("jobCategory");
    const encodeSearchText = encodeURIComponent(searchParams.get("text") || "");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");

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

    if (encodeSearchText) {
        url = url + `text=${encodeSearchText}`;
    }

    const handleClick = useCallback(() => {
        router.push(url);
    }, [url]);

    return (
        <div className={styles.vacancy__info__back} onClick={handleClick}>
            <BackIcon />
            Назад
        </div>
    );
};

export default ButtonBack;
