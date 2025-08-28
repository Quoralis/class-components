import type { DataCountry, DataYear } from '../../types/co2.ts';

export default function CountryTable({
  country,
  nameColumns,
}: {
  country: DataCountry;
  nameColumns: (keyof DataYear)[];
}) {
  const lastElem = country.data.length - 1;

  return (
    <table
      className="table table-light table-bordered table-sm w-100 text-center align-middle"
      style={{ fontSize: '0.75rem' }}
    >
      <thead>
        <tr>
          {nameColumns.map((nameColumn) => (
            <th key={nameColumn} style={{ fontSize: '0.65rem' }}>
              {nameColumn}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {nameColumns.map((nameColumn) => (
            <th key={nameColumn} style={{ fontSize: '0.75rem' }}>
              {country.data[lastElem][nameColumn] ?? 'N/A'}
            </th>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
