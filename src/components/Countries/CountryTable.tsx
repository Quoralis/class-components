import type { DataCountry } from '../../types/co2.ts';
import useCountryContext from '../../hook/useCountryContext';

export default function CountryTable({ country }: { country: DataCountry }) {
  const { year, columns } = useCountryContext();
  const idx = country.data.findIndex((item) => item.year === year);
  const indLastYear = country.data.length - 1;
  const actualInd = idx === -1 ? indLastYear : idx;

  return (
    <table
      className="table table-light table-bordered table-sm w-100 text-center align-middle"
      style={{ fontSize: '0.75rem' }}
    >
      <thead>
        <tr>
          {columns.map((nameColumn) => (
            <th key={nameColumn} style={{ fontSize: '0.65rem' }}>
              {nameColumn}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columns.map((nameColumn) => (
            <th key={nameColumn} style={{ fontSize: '0.75rem' }}>
              {country.data[actualInd][nameColumn] ?? 'N/A'}
            </th>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
