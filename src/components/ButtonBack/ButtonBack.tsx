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
    const text = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");
    // const jobCategory = searchParams.get("jobCategory");
    // const params = useParams<{ jobCategory: string }>();
    // console.log("params: ", params);

    // let url = `/vacancies/${jobCategory}?region=${value}&offset=${offset}&text=${text}`;
    let url = `/vacancies?`;

    switch (jobCategory || regionCode || offset || text) {
        case jobCategory:
            url = url + `${jobCategory}&`;
        // break;
        case regionCode:
            url = url + `regionCode=${regionCode}&`;
        //break;
        case offset:
            url = url + `offset=${offset}&`;
        // break;
        case text:
            url = url + `text=${text}`;
        // break;
        default:
            break;
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
