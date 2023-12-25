"use client";
import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import styles from "./MapVacancy.module.scss";

const MapVacancy = ({ lng, lat }: { lng: string; lat: string }) => {
    const defaultState = {
        center: [Number(lat), Number(lng)],
        zoom: 10,
    };
    return (
        <div className={styles.MapVacancy}>
            <YMaps>
                <Map options={{ autoFitToViewport: "always" }} width={"100%"} defaultState={defaultState}>
                    <Placemark geometry={[Number(lat), Number(lng)]} />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapVacancy;
