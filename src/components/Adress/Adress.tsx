"use client";
import { ResultAdress } from "@/app/lib/types";
import React from "react";

const Adress = ({ adress, location }: { adress?: ResultAdress[]; location?: string }) => {
    if (adress) {
        const { state, county, town, village, city, city_district, road, house_number } = adress[0].components;
        const locality = town || village || city;
        const cityDistrict = city_district ? `${city_district},` : "";
        const madeAdress = `${state}, ${county}, ${locality}, ${cityDistrict} ${road},${house_number}.`;

        return (
            <div>
                <p>Адресс: {madeAdress}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>Адресс: {location || "Нет адреса"}</p>
            </div>
        );
    }
};

export default Adress;
