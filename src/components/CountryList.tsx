import fetchCountriesData from '../api/fetchCountriesData';
import type { DataCountry } from '../types/co2.ts';
import CountryItem from './CountryItem.tsx';

const countriesData = fetchCountriesData();

export default function CountryList() {
  const countries = countriesData.read();

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
              <h4>{key}</h4>
              <CountryItem country={value} />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
