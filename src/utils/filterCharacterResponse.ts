import type {
  CharacterDataResponse,
  CharacterSearchResponse,
} from '../store/types/types.ts';

export function filterCharacterResponse(
  data: CharacterSearchResponse,
  search: string
): CharacterSearchResponse {
  const formattedSearch = search.trim().toLowerCase();
  if (!formattedSearch) return data;
  const filteredData = data.characters.filter((char: CharacterDataResponse) =>
    char.name.toLowerCase().includes(formattedSearch)
  );
  const pageSize = data.page.pageSize;
  const totalPages = pageSize ? Math.ceil(filteredData.length / pageSize) : 1;
  return {
    characters: filteredData,
    page: {
      totalPages: totalPages,
    },
  };
}
