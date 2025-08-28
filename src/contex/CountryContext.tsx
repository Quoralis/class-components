import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { DataYear } from '../types/co2';

interface CountryContext {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  columns: (keyof DataYear)[];
}

const CountryContext = createContext<CountryContext | null>(null);

export default CountryContext;
