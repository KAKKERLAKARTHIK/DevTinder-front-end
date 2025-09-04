import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
            baseUrl: "/api",
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (credentials) => ({
        url: '/profile/view', 
      })
    }),
    updadeProfile: builder.mutation({
      query: (credentials) => ({
        url: '/profile/edit',
        method: 'PATCH',
        body: credentials
      })
    }),
  })
});

export const { useLazyGetProfileQuery,useUpdadeProfileMutation } = profileApi;
