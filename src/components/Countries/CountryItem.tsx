import type { DataCountry } from '../../types/co2.ts';
import useCountryContext from '../../hook/useCountryContext';

interface Props {
  country: DataCountry;
}

export default function CountryItem({ country }: Props) {
  const { year } = useCountryContext();

  const idx = country.data.findIndex((item) => item.year === year);
  const indLastYear = country.data.length - 1;
  const actualInd = () => (idx === -1 ? indLastYear : idx); // индекс не найдет, то -1

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
            {country.data[actualInd()]?.population?.toLocaleString() ?? 'N/A'}
          </td>
          <td>{country.data[actualInd()]?.year ?? 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}
