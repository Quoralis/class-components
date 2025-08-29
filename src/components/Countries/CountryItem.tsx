import type { DataCountry } from '../../types/co2.ts';
import useCountryContext from '../../hook/useCountryContext';
import * as React from 'react';
import { useMemo } from 'react';
interface Props {
  country: DataCountry;
}

function CountryItem({ country }: Props) {
  const { year } = useCountryContext();

  const yearsInd = useMemo(() => {
    const yearMap = new Map();
    country.data.forEach((item, index) => {
      yearMap.set(item.year, index);
    });
    return yearMap;
  }, [country.data]);

  const row = country.data[yearsInd.get(year) ?? country.data.length - 1];

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
          <td>{row?.population?.toLocaleString() ?? 'N/A'}</td>
          <td>{row?.year ?? 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default React.memo(CountryItem);
