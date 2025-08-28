import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const connectionApi = createApi({
  reducerPath: 'connectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllConnections: builder.query({
      query: (credentials) => ({
        url: '/user/connections', 
      })
    }),
 
  })
});

export const { useLazyGetAllConnectionsQuery } = connectionApi;
