import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:4000/';

export const nameApi = createApi({
  reducerPath: 'nameApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => 'api/getAllNames',
      providesTags: ['NameList'],
    }),
    addItem: builder.mutation({
      query: ({ name, description }) => ({
        url: 'api/addName',
        method: 'POST',
        body: { name, description },
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['NameList'],
    }),
    updateName: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `api/updateName/${id}`,
        method: 'PUT',
        body: { name, description },
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['NameList'],
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useUpdateNameMutation } = nameApi;
