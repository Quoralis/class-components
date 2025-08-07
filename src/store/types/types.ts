export interface CharacterDataResponse {
  uid: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  gender?: string;
  species?: string;
  homeWorld?: string;
  hologram?: boolean;
}

export interface PageInfo {
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages: number;
}

export interface CharacterSearchResponse {
  characters: CharacterDataResponse[];
  page: PageInfo;
}
export interface CharacterByIdResponse {
  character: CharacterDataResponse;
}
