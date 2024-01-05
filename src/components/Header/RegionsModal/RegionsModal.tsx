"use client";
import React, { useMemo } from "react";
import clsx from "clsx";
import { Modal } from "@mantine/core";
import SelectedIcon from "../../../../public/images/svg/selectedIcon.svg";
import ArrowLeftIcon from "../../../../public/images/svg/arrowLeftIcon.svg";
import styles from "./RegionsModal.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { IRegion } from "@/app/lib/types";

const RegionsModal = ({
    showRegionsModal,
    closeHandlerRegionsModal,
    regions,
}: {
    showRegionsModal: boolean;
    closeHandlerRegionsModal: () => void;
    regions?: IRegion[];
}) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const regionCodeStorage = localStorage.getItem("regionCode");

    const SearchParams = new URLSearchParams(searchParams);

    const arrRegions = useMemo(() => {
        return regions?.map((item) => {
            return { value: item.code, label: item.name };
        });
    }, [regions]);

    function onChangeRegion(regionCode: string) {
        SearchParams.set("regionCode", regionCode);
        replace(`?${SearchParams.toString()}`);
        localStorage.setItem("regionCode", regionCode);
        closeHandlerRegionsModal();
    }

    return (
        <Modal.Root
            fullScreen
            radius={0}
            transitionProps={{ transition: "fade", duration: 200 }}
            opened={showRegionsModal}
            onClose={() => closeHandlerRegionsModal()}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <ArrowLeftIcon style={{ cursor: "pointer" }} onClick={() => closeHandlerRegionsModal()} />
                    <Modal.Title className={styles.title}>Выберите регион</Modal.Title>
                    <Modal.CloseButton className={styles.closebutton} />
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.cities__list}>
                        {arrRegions?.map((item) => (
                            <div
                                key={item.value}
                                className={clsx(styles.cities__item, regionCodeStorage === item.value && styles["cities__item--active"])}
                                onClick={() => onChangeRegion(item.value)}>
                                {item.label}
                                {regionCodeStorage === item.value && <SelectedIcon />}
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default RegionsModal;
