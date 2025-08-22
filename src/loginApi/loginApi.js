import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: (result, error, arg) => result ? ['login'] : [],
       refetchOnMountOrArgChange: true

    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: '/auth/logout',
        method: 'POST',
         
      }),
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = loginApi;
