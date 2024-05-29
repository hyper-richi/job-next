'use client';
import React from 'react';
import { ResultAdress } from '../../..';

const Adress = ({ adress, location }: { adress?: ResultAdress[]; location?: string }) => {
  if (adress) {
    const { state, county, town, village, city, city_district, road, house_number } = adress[0].components;
    const locality = town || village || city;
    const cityDistrict = city_district ? `${city_district},` : '';
    const madeAdress = `${state || 'нет'},
     район: ${county || 'нет'},
     населенный пункт: ${locality || 'нет'} ${cityDistrict || ''},
     ул: ${road || 'нет'},
     дом: ${house_number || 'нет'}.`;

    return (
      <div>
        <p>Адресс: {madeAdress}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Адресс: {location || 'Нет адреса'}</p>
      </div>
    );
  }
};

export default Adress;
