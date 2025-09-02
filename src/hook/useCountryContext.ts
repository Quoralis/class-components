import { useContext } from 'react';
import CountryContext from '../contex/CountryContext';

const useCountryContext = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error(
      'useCountryContext must be used inside <CountryContext.Provider>'
    );
  }
  return ctx;
};

export default useCountryContext;
