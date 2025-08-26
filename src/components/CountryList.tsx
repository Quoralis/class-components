import fetchCountriesData from '../api/fetchCountriesData';
import type { DataCountry } from '../types/co2.ts';
import CountryItem from './CountryItem.tsx';
import CountryTable from './CountryTable.tsx';
import { useState } from 'react';

const countriesData = fetchCountriesData();

export default function CountryList() {
  const countries = countriesData.read();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="container py-3 bg-dark text-warning min-vh-100">
      <h1 className="mb-4 text-center">Countries list</h1>

      <ul className="list-group">
        {Object.entries(countries).map(
          ([key, value]: [string, DataCountry]) => (
            <li
              key={key}
              className="list-group-item bg-dark text-warning border-warning"
            >
              <div role={'button'} onClick={() => setOpen(!isOpen)}>
                <h4>{key}</h4>
                <CountryItem country={value} />
                {isOpen && <CountryTable country={value} />}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
