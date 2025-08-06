export interface CharacterSearchResponse {
  characters: Item[];
  page: {
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages: number;
  };
}

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

export function filterCharacterResponse(
  data: CharacterSearchResponse,
  search: string
): CharacterSearchResponse {
  const formattedSearch = search.trim().toLowerCase();
  if (!formattedSearch) return data;
  const filteredData = data.characters.filter((char: Item) =>
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
