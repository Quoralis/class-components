import fetchCountriesData from '../api/fetchCountriesData';
import type { DataCountry } from '../types/co2.ts';
import CountryItem from './CountryItem';
import CountryTable from './CountryTable';
import { useState } from 'react';

const countriesData = fetchCountriesData();

export default function CountryList() {
  const countries = countriesData.read();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleCard = (id: string) => {
    setOpenId((prevState) => (prevState === id ? null : id));
  };

  return (
    <div className="container py-3 bg-dark text-warning min-vh-100">
      <h1 className="mb-4 text-center">Countries list</h1>

      <ul className="list-group">
        {Object.entries(countries).map(
          ([key, value]: [string, DataCountry]) => (
            <li
              key={key}
              className="list-group-item bg-dark text-warning border-warning"
              onClick={() => handleCard(key)}
            >
              <div role={'button'}>
                <h4>{key}</h4>
                <CountryItem country={value} />
                {openId === key && <CountryTable country={value} />}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
