import type { DataCountry } from '../types/co2.ts';

export default function CountryTable({ country }: { country: DataCountry }) {
  const lastElem = country.data.length - 1;

  return (
    <table
      className="table table-light table-bordered table-sm w-100 text-center align-middle"
      style={{ fontSize: '0.75rem' }}
    >
      <thead>
        <tr>
          <th style={{ fontSize: '0.65rem' }}>Year</th>
          <th style={{ fontSize: '0.65rem' }}>Population</th>
          <th style={{ fontSize: '0.65rem' }}>CO₂</th>
          <th style={{ fontSize: '0.65rem' }}>CO₂ per capita</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{country.data[lastElem]?.year ?? 'N/A'}</td>
          <td>
            {country.data[lastElem]?.population?.toLocaleString() ?? 'N/A'}
          </td>
          <td>{country.data[lastElem]?.cement_co2 ?? 'N/A'}</td>
          <td>{country.data[lastElem]?.cement_co2_per_capita ?? 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}
