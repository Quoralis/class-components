import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CharacterSearchResponse } from './types/types.ts';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterSearchResponse, number>({
      query: (page) => `character/search?pageNumber=${page}&pageSize=16`,
    }),
  }),
});

export const { useGetCharactersQuery } = characterApi;
