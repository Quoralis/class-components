import { useEffect, useState } from 'react';
import type { Item } from '../layout/SearchResults/ResultsFieldFn.tsx';

interface CharacterByIdResponse {
  character: Item;
}

export default function useCharacterById(uid: string) {
  const [character, setCharacter] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://stapi.co/api/v1/rest/character?uid=${uid}`
        );
        const result: CharacterByIdResponse = await res.json();
        setCharacter(result.character);
      } catch (err) {
        console.error(err);
        setError('Failed to load character');
      } finally {
        setLoading(false);
      }
    };

    if (uid) fetchCharacter();
  }, [uid]);

  return { character, loading, error };
}
