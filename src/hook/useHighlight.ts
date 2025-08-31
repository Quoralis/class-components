import { useEffect, useState } from 'react';

export function useHighlight(deps: ReadonlyArray<unknown>) {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 1000);
    return () => clearTimeout(timer);
  }, deps);

  return highlight;
}
