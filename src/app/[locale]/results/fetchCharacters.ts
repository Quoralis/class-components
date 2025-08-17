import type {
  CharacterByIdResponse,
  CharacterSearchResponse,
} from '../../../store/types/types';
import { notFound } from 'next/navigation';

export async function fetchCharacters(
  page: number,
  name: string
): Promise<CharacterSearchResponse> {
  const res = await fetch(
    `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=16&sort=name,ASC&name=${encodeURIComponent(name.trim())}`,
    {
      method: 'POST',
    }
  );

  if (res.status === 404) return notFound();

  if (!res.ok) throw new Error(`STAPI error ${res.status}`);
  const data = await res.json();
  return data as CharacterSearchResponse;
}

export async function fetchCharactersById(
  uid: string
): Promise<CharacterByIdResponse> {
  const res = await fetch(`https://stapi.co/api/v1/rest/character/?uid=${uid}`);

  if (!res.ok) throw new Error(`STAPI error ${res.status}`);
  const data = await res.json();
  return data as CharacterByIdResponse;
}
