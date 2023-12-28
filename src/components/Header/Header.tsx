"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeaderProps } from "./Header.props";
import Link from "next/link";
import styles from "./Header.module.scss";
import Navbar from "../Navbar/Navbar";
import { Modal } from "@mantine/core";
import clsx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectRegionsData } from "@/app/lib/store/features/regions/selectors/selectRegionsData";
import { VacancyRegion } from "@/app/lib/types";
import RegionSelect from "../RegionSelect/RegionSelect";
import PointIcon from "../../../public/images/svg/pointIcon.svg";
import VKIcon from "../../../public/images/svg/vkIcon.svg";
import TelegrammIcon from "../../../public/images/svg/telegrammIcon.svg";

//

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
   // console.log("Header: ");
    const [showNavbar, setShowNavbar] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);// useRef
    const [opened, { open, close }] = useDisclosure(false);
    const regionCodeStorage = localStorage.getItem("regionCode") || "0000000000000";

    const regionsData = useSelector(selectRegionsData);

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

    const regionMock: VacancyRegion = {
        code: "0000000000000",
        name: "Вся Россия",
        shortName: "",
        text: "",
        key: "",
    };

    const regionName = useMemo(() => {
        if (regionsData) {
            return (
                [regionMock, ...regionsData]?.find((item) => {
                    return item.code === regionCodeStorage;
                })?.name || regionMock.name
            );
        }
    }, [regionsData, regionCodeStorage]);

    return (
        <>
            <header className={clsx(className, styles.desktop)} {...props}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Link className={styles.header__logo} href={`/`}>
                            JOB
                        </Link>
                        <div className={styles.header__search}>
                            <input type="text" placeholder="Поиск по вакансиям" />
                            <div className={styles.search__icon}></div>
                        </div>
                        <div className={styles.header__info}>
                            <div className={styles.info__cities} onClick={open}>
                                <span className={styles["city-name"]}>{regionName}</span>
                                <div className={styles["city-logo"]}>
                                    <PointIcon />
                                </div>
                            </div>
                            <div className={styles.info__socials}>
                                <svg width="1" height="46" viewBox="0 0 1 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#fff" d="M0 0h1v46H0z"></path>
                                </svg>
                                <VKIcon />
                                <TelegrammIcon />
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
                            <div className={styles.sidebar__item__logo}>
                                <div className={styles.sidebar__city__logo}>
                                    <PointIcon />
                                </div>
                                <div className={styles.sidebar__location}>
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

            <Modal.Root centered opened={opened} onClose={close}>
                <Modal.Overlay />
                <Modal.Content
                    styles={{
                        content: {
                            maxWidth: "550px",
                            padding: "60px",
                            textAlign: "end",
                            borderRadius: "16px",
                        },
                    }}>
                    <Modal.CloseButton className={styles.closebutton} />
                    <Modal.Header
                        styles={{
                            header: {
                                justifyContent: "center",
                            },
                        }}>
                        <Modal.Title
                            styles={{
                                title: {
                                    color: "#002855",
                                    fontSize: "36px",
                                    fontWeight: "500",
                                    lineHeight: "42px",
                                    whiteSpace: "nowrap",
                                },
                            }}>
                            Выберите город
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        styles={{
                            body: {
                                textAlign: "center",
                                padding: 0,
                            },
                        }}>
                        <div className={styles.modal__select}>
                            <RegionSelect />
                        </div>
                        <Button onClick={close} classNames={styles} variant="filled">
                            Сохранить
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};
export default Header;
