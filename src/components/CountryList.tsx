import fetchCountriesData from '../api/fetchCountriesData';
import type { DataCountry } from '../types/co2.ts';
import CountryItem from './CountryItem';
import CountryTable from './CountryTable';
import { useState } from 'react';
import Modal from './Modal/Modal';
import ColumnSelector from './ColumnSelector/ColumnSelector';
import * as React from 'react';

const countriesData = fetchCountriesData();

export default function CountryList() {
  const countries = countriesData.read();
  const [openId, setOpenId] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCard = (id: string) => {
    setOpenId((prevState) => (prevState === id ? null : id));
  };

  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenModal((prev) => !prev);
  };
  return (
    <div className="container py-3 bg-dark text-warning min-vh-100">
      <h1 className="mb-4 text-center">Countries list</h1>

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
                <CountryItem country={value} />
                {openId === key && <CountryTable country={value} />}
              </div>
            </li>
          )
        )}
      </ul>
      {isOpenModal && (
        <Modal>
          <ColumnSelector close={handleModal} />
        </Modal>
      )}
    </div>
  );
}
