import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (credentials) => ({
        url: '/profile/view', 
      })
    })
  })
});

export const { useLazyGetProfileQuery } = profileApi;
