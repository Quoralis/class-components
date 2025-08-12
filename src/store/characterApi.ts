import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CharacterByIdResponse,
  CharacterSearchResponse,
} from './types/types.ts';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/' }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      CharacterSearchResponse,
      { page: number; name: string }
    >({
      query: ({ page, name }) => ({
        url: `character/search?pageNumber=${page}&pageSize=16&sort=name,ASC&name=${encodeURIComponent(
          name.trim()
        )}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
      providesTags: ['Characters'],
    }),

    getCharacterById: builder.query<CharacterByIdResponse, string>({
      query: (uid) => `character?uid=${uid}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
