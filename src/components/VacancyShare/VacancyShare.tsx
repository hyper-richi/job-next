"use client";
import React, { ReactElement, useEffect, useState } from "react";
import styles from "./VacancyShare.module.scss";
import clsx from "clsx";
import { Button, Tooltip, Group } from "@mantine/core";

const VacancyShare = () => {
    const [show, setShow] = useState(false);
    /* function handleClick() {
        console.log("VacancyShare");
        setShow((show) => !show);
    } */

    const handleClick = () => {
        setShow((show) => !show);
        setTimeout(() => {
            setShow((show) => !show);
        }, 1000);
    };

    /* useEffect(() => {
        const timer = setTimeout(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, []); */

    function label(): ReactElement<any, any> {
        return (
            <div className={clsx(styles.tooltip /* show && styles.hidden */)} /* style={{ display: "none" }} */>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.759 6.427a1 1 0 00-.372 1.364A8.455 8.455 0 0120.5 12 8.5 8.5 0 1112 3.5c1.503 0 2.947.39 4.22 1.12a1 1 0 10.995-1.735A10.455 10.455 0 0012 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12c0-1.848-.48-3.63-1.377-5.201a1 1 0 00-1.364-.372zM11 13.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a.996.996 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L11 13.586z"
                        fill="#06CA99"></path>
                </svg>
                Ссылка успешно скопирована!
            </div>
        );
    }
    return (
        <Tooltip
            opened={show}
            withinPortal={false}
            events={{ hover: false, focus: false, touch: true }}
            label={label()}
            closeDelay={500}
            transitionProps={{ transition: "slide-down", duration: 300 }}>
            <div onClick={handleClick} className={styles.share}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.share__icon}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18 9a3.99 3.99 0 01-2.997-1.351L8.9 11.112a4.012 4.012 0 01.001 1.771l6.113 3.454a4 4 0 11-.917 1.776l-6.111-3.452a4 4 0 11-.003-5.325l6.11-3.468A4 4 0 1118 9zM7 12a2 2 0 11-4 0 2 2 0 014 0zm13-7a2 2 0 11-4 0 2 2 0 014 0zm0 14a2 2 0 11-4 0 2 2 0 014 0z"
                        fill="#005BFF"></path>
                </svg>
                <span className="vacancy__actions__share__text">Поделиться вакансией</span>
            </div>
        </Tooltip>
    );
};

export default VacancyShare;
