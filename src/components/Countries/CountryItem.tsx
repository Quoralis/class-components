import type { DataCountry } from '../../types/co2.ts';

export default function CountryItem({ country }: { country: DataCountry }) {
  const lastElem = country.data.length - 1;

  return (
    <table
      className="table table-dark table-bordered table-striped table-sm w-100"
      style={{ fontSize: '0.75rem' }}
    >
      <thead>
        <tr className="text-center align-middle">
          <th>ISO</th>
          <th>Population</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center align-middle">
          <td>{country.iso_code || 'N/A'}</td>
          <td>
            {country.data[lastElem]?.population?.toLocaleString() || 'N/A'}
          </td>
          <td>{country.data[lastElem]?.year || 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}
