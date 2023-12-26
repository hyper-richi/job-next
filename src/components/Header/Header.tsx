"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HeaderProps } from "./Header.props";
import Link from "next/link";
import styles from "./Header.module.scss";
import Navbar from "../Navbar/Navbar";
import { Modal } from "@mantine/core";
import clsx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import FinderSelect from "../FinderSelect/FinderSelect";

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const onToggle = () => {
        setShowSidebar((prev) => !prev);
    };

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const closeHandler = useCallback(() => {
        if (!showSidebar) {
            setShowSidebar(true);
        }
    }, [showSidebar]);

    return (
        <>
            <header className={clsx(className, styles.desktop)} {...props}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Link className={styles.header__logo} href={`/`}>
                            JOB
                        </Link>
                        {/*  <FinderSelect regions={store.regionsList} /> */}
                        <div className={styles.header__search}>
                            <input type="text" placeholder="Поиск по вакансиям" />
                            <div className={styles.search__icon}></div>
                        </div>
                        <div className={styles.header__info}>
                            <div className={styles.info__cities}>
                                <span onClick={open} className={styles["city-name"]}>
                                    Санкт-Петербург
                                </span>
                                <div className={styles["city-logo"]}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M15.764 17.834a1 1 0 00-1.414.024A59.41 59.41 0 0112 20.143C7.142 15.64 5.5 13.043 5.5 10a6.5 6.5 0 0113 0c0 1.472-.36 2.76-1.179 4.149a1 1 0 001.723 1.015c.998-1.693 1.456-3.33 1.456-5.164a8.5 8.5 0 00-17 0c0 3.904 2.065 7.003 7.828 12.24l.672.611.673-.611a67.199 67.199 0 003.116-2.992 1 1 0 00-.025-1.414zM16.5 10c0-2.476-2.024-4.5-4.5-4.5A4.512 4.512 0 007.5 10c0 2.476 2.024 4.5 4.5 4.5s4.5-2.024 4.5-4.5z"
                                            fill="#fff"></path>
                                        <circle cx="12" cy="10" r="2" fill="#005BFF"></circle>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.info__socials}>
                                <svg width="1" height="46" viewBox="0 0 1 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#fff" d="M0 0h1v46H0z"></path>
                                </svg>
                                <Link className={styles.header__logo} href={`/`}>
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="#005BFF" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 34a4 4 0 004 4h30a4 4 0 004-4V4a4 4 0 00-4-4H4a4 4 0 00-4 4v30z"></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M27.794 21.44c-1.88-1.744-1.628-1.462.636-4.479 1.38-1.837 1.93-2.96 1.758-3.44-.165-.459-1.178-.338-1.178-.338l-3.375.023s-.25-.035-.436.075c-.18.11-.299.362-.299.362s-.534 1.422-1.246 2.633c-1.503 2.552-2.103 2.686-2.349 2.526-.572-.369-.429-1.482-.429-2.273 0-2.474.376-3.505-.73-3.772-.367-.088-.637-.146-1.576-.156-1.204-.014-2.222.003-2.799.285-.384.19-.68.609-.5.632.223.03.728.136.996.5.345.471.334 1.527.334 1.527s.198 2.912-.464 3.274c-.455.248-1.079-.258-2.419-2.573-.687-1.186-1.205-2.497-1.205-2.497s-.1-.245-.279-.377c-.215-.16-.517-.208-.517-.208l-3.208.02s-.482.014-.658.223c-.158.185-.013.572-.013.572s2.511 5.873 5.354 8.834c2.607 2.715 5.568 2.536 5.568 2.536h1.341s.405-.046.612-.268c.19-.204.185-.588.185-.588s-.027-1.801.808-2.066c.824-.261 1.882 1.74 3.003 2.509.848.581 1.491.454 1.491.454l2.998-.041s1.568-.096.825-1.33c-.06-.1-.434-.911-2.229-2.578z"
                                            fill="#fff"></path>
                                    </svg>
                                </Link>
                                <Link className={styles.header__logo} href={`/`}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.512 18.749c5.906-2.54 9.844-4.215 11.814-5.024 5.626-2.31 6.795-2.711 7.557-2.725.168-.003.542.038.785.233.205.164.261.386.288.541.027.156.06.51.034.788-.305 3.162-1.624 10.837-2.295 14.379-.284 1.498-.843 2-1.384 2.05-1.177.107-2.07-.767-3.21-1.505-1.782-1.154-2.79-1.872-4.52-2.998-2-1.301-.704-2.016.436-3.185.298-.306 5.482-4.96 5.582-5.383.012-.053.024-.25-.094-.354-.119-.103-.294-.068-.42-.04-.179.04-3.027 1.9-8.545 5.576-.808.548-1.54.815-2.196.802-.724-.016-2.115-.404-3.15-.736-1.268-.407-2.276-.623-2.189-1.314.046-.36.548-.729 1.507-1.105z"
                                            fill="#fff"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar showNavbar={showNavbar} />
            </header>

            <div className={clsx(styles.mobile, styles.sticky)}>
                <div className={styles.mobile__main}>
                    <button onClick={onToggle}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.222 17c.295 0 .578.105.786.293a.952.952 0 01.325.707c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.112c-.296 0-.578-.105-.787-.293A.952.952 0 012 18c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293h11.111zm6.667-6c.295 0 .577.105.786.293A.952.952 0 0122 12c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.11c-.295 0-.577-.105-.786-.293A.952.952 0 012 12c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293H20.89zm0-6c.295 0 .577.105.786.293A.952.952 0 0122 6c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.11c-.295 0-.577-.105-.786-.293A.952.952 0 012 6c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293H20.89z"
                                fill="#fff"></path>
                        </svg>
                    </button>
                    <Link className={styles.header__logo} href={`/`}>
                        JOB
                    </Link>
                    <div></div>
                </div>
                <div className={clsx(styles.mobile__sidebar, showSidebar && styles.hidden)} onClick={closeHandler}>
                    <div className={styles.sidebar__content} onClick={onContentClick}>
                        <div className={styles.sidebar__nav}>
                            <div className={styles.sidebar__item}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="#002855"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="location__icon">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.764 17.834a1 1 0 00-1.414.024A59.41 59.41 0 0112 20.143C7.142 15.64 5.5 13.043 5.5 10a6.5 6.5 0 0113 0c0 1.472-.36 2.76-1.179 4.149a1 1 0 001.723 1.015c.998-1.693 1.456-3.33 1.456-5.164a8.5 8.5 0 00-17 0c0 3.904 2.065 7.003 7.828 12.24l.672.611.673-.611a67.199 67.199 0 003.116-2.992 1 1 0 00-.025-1.414zM12 14.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                                </svg>
                                <div className="location__inner">
                                    <span>Краснодар</span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#location-right_svg__clip0)">
                                            <path fill="#fff" d="M0 16V0h16v16z"></path>
                                            <path d="M5 13l5-5-5-5" stroke="#B2BAC2" strokeWidth="2" strokeLinecap="round"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="location-right_svg__clip0">
                                                <path fill="#fff" d="M0 0h16v16H0z"></path>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <Navbar showNavbar={showNavbar} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                centered
                opened={opened}
                onClose={close}
                title="Authentication"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}>
                <FinderSelect /* regions={store.regions} */ />
            </Modal>
        </>
    );
};
export default Header;
