import type { DataCountry } from '../../types/co2.ts';

interface Props {
  country: DataCountry;
  chooseYear: number;
}

export default function CountryItem({ country, chooseYear }: Props) {
  const idx = country.data.findIndex((item) => item.year === chooseYear);
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
          <td>{country.data[idx]?.population?.toLocaleString() ?? 'N/A'}</td>
          <td>{country.data[idx]?.year ?? 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}
