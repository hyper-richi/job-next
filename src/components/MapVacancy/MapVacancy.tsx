"use client";
import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapVacancy = ({ lng, lat }: { lng: string; lat: string }) => {
    console.log("lat: ", lat);
    console.log("lng: ", lng);
    const defaultState = {
        center: [Number(lat), Number(lng)],
        zoom: 10,
    };
    return (
        <div id="map" style={{ width: "100%", height: "300px" }}>
            <YMaps>
                <Map width={"100%"} defaultState={defaultState}>
                    <Placemark geometry={[Number(lat), Number(lng)]} />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapVacancy;
