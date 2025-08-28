import fetchCountriesData from '../../api/fetchCountriesData';
import type { DataCountry, DataYear } from '../../types/co2.ts';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import ColumnSelector from '../ColumnSelector/ColumnSelector';
import * as React from 'react';
import CountryItem from './CountryItem';
import CountryTable from './CountryTable';
import CountryControls from './CountryControls';

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
  const handleCard = (id: string) => {
    setOpenId((prevState) => (prevState === id ? null : id));
  };

  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenModal((prev) => !prev);
  };

  const saveCheckBoxesField = (checkBoxFields: (keyof DataYear)[]) => {
    const allColumns = new Set<keyof DataYear>([...columns, ...checkBoxFields]);
    setColumns([...allColumns]);
  };
  return (
    <div className="container py-3 bg-dark text-warning min-vh-100">
      <h1 className="mb-4 text-center">Countries list</h1>
      <CountryControls year={year?.toString()} onYearChange={setYear} />
      <ul className="list-group">
        {Object.entries(countries).map(
          ([key, value]: [string, DataCountry]) => (
            <li
              key={key}
              className="list-group-item bg-dark text-warning border-warning"
              onClick={() => handleCard(key)}
            >
              <div className="d-flex justify-content-between align-items-start">
                <h4>{key}</h4>
                <button
                  type="button"
                  onClick={handleModal}
                  className="btn btn-dark text-warning border-warning btn-sm"
                >
                  Add columns
                </button>
              </div>

              <div>
                <CountryItem country={value} chooseYear={Number(year)} />
                {openId === key && (
                  <CountryTable
                    country={value}
                    nameColumns={columns}
                    chooseYear={year}
                  />
                )}
              </div>
            </li>
          )
        )}
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
  );
}
