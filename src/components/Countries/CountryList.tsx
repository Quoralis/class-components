import fetchCountriesData from '../../api/fetchCountriesData';
import type { DataCountry, DataYear } from '../../types/co2.ts';
import { useCallback, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import ColumnSelector from '../ColumnSelector/ColumnSelector';
import CountryItem from './CountryItem';
import CountryTable from './CountryTable';
import CountryControls from './CountryControls';
import CountryContext from '../../contex/CountryContext';

const countriesData = fetchCountriesData();

const defaultColumns: (keyof DataYear)[] = [
  'year',
  'population',
  'cement_co2',
  'cement_co2_per_capita',
];

export default function CountryList() {
  const countries = countriesData.read();
  const [openId, setOpenId] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [columns, setColumns] = useState(defaultColumns);
  const [year, setYear] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleCard = useCallback((id: string) => {
    setOpenId((prevState) => (prevState === id ? null : id));
  }, []);

  const handleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const saveCheckBoxesField = useCallback(
    (checkBoxFields: (keyof DataYear)[]) => {
      setColumns((prev) => {
        const allColumns = new Set<keyof DataYear>([
          ...prev,
          ...checkBoxFields,
        ]);
        return [...allColumns];
      });
    },
    []
  );

  const filteredCountries = useMemo(() => {
    return Object.entries(countries).filter(([key]) => {
      if (search === '') return true;
      return key.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, countries]);

  const sortedCountries = useMemo(() => {
    const list = [...filteredCountries];
    return list.sort(([nameA, countryA], [nameB, countryB]) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      if (sortBy === 'population') {
        const popA =
          countryA.data.find((d) => d.year === year)?.population ??
          countryA.data[countryA.data.length - 1]?.population ??
          0;

        const popB =
          countryB.data.find((d) => d.year === year)?.population ??
          countryB.data[countryB.data.length - 1]?.population ??
          0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
      return 0;
    });
  }, [filteredCountries, sortBy, sortOrder, year]);

  const onSearchChange = useCallback((searchString: string) => {
    setSearch(searchString);
  }, []);

  return (
    <CountryContext.Provider
      value={useMemo(() => ({ year, setYear, columns }), [year, columns])}
    >
      <div className="container py-3 bg-dark text-warning min-vh-100">
        <h1 className="mb-4 text-center">Countries list</h1>

        <CountryControls
          search={onSearchChange}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
        <button
          type="button"
          onClick={handleModal}
          className="btn btn-dark text-warning border-warning btn-sm"
        >
          Add columns
        </button>
        <ul className="list-group">
          {sortedCountries.map(([key, value]: [string, DataCountry]) => (
            <li
              key={key}
              className="list-group-item bg-dark text-warning border-warning"
              onClick={() => handleCard(key)}
            >
              <div className="d-flex justify-content-between align-items-start">
                <h4>{key}</h4>
              </div>

              <div>
                <CountryItem country={value} />
                {openId === key && <CountryTable country={value} />}
              </div>
            </li>
          ))}
        </ul>
        {isOpenModal && (
          <Modal>
            <ColumnSelector
              close={handleModal}
              saveToState={saveCheckBoxesField}
              selected={columns}
            />
          </Modal>
        )}
      </div>
    </CountryContext.Provider>
  );
}
