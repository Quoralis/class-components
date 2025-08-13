import type { CharacterDataResponse } from '../../store/types/types.ts';

export async function fetchCharacters(
  page: number,
  name: string
): Promise<CharacterDataResponse[]> {
  const res = await fetch(
    `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=16&sort=name,ASC&name=${encodeURIComponent(name.trim())}`,
    {
      method: 'POST',
    }
  );

  if (!res.ok) throw new Error(`STAPI error ${res.status}`);
  const data = await res.json();
  return data?.characters ?? [];
}
