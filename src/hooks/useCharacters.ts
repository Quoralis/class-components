import { useEffect, useState } from 'react';

export interface Item {
  uid: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  gender?: string;
  species?: string;
  homeWorld?: string;
  hologram?: boolean;
}

interface CharacterSearchResponse {
  characters: Item[];
  page: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}

export function useCharacterSearch(
  search: string,
  page: number,
  trigger: boolean
) {
  const [data, setData] = useState<Item[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=16`;
        const response = await fetch(url);
        const result: CharacterSearchResponse = await response.json();

        setTotalPages(result.page.totalPages);
        const filtered = search
          ? result.characters.filter((char) =>
              char.name.toLowerCase().includes(search.toLowerCase())
            )
          : result.characters;

        setData(filtered);
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page, trigger]);

  return { data, totalPages, loading, error };
}
export default useCharacterSearch;
