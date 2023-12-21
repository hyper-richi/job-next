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
    // const jobCategory = searchParams.get("jobCategory");
    // const params = useParams<{ jobCategory: string }>();
    // console.log("params: ", params);

    let url = `/vacancies/${jobCategory}?text=${text}&offset=${offset}`;
    /* switch (jobCategory || text || offset) {
        case jobCategory && !offset && !text:
            url = `/vacancies/${jobCategory}`;
            break;
        case jobCategory && offset && !text:
            url = `/vacancies/${jobCategory}&offset=${offset}`;
            break;
        case jobCategory && offset && text:
            url = `/vacancies/${jobCategory}?text=${text}&offset=${offset}`;
            break;
        case !jobCategory && text && offset:
            url = `/vacancies?text=${text}&offset=${offset}`;
            break;
        case !jobCategory && !text && offset:
            url = `/vacancies?offset=${offset}`;
            break;
    } */

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
