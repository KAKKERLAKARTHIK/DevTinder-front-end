import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const connectionApi = createApi({
    reducerPath: 'connectionApi',
    baseQuery: fetchBaseQuery({
                baseUrl: "/api",
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllConnections: builder.query({
            query: (credentials) => ({
                url: '/user/connections',
            })
        }),
        getAllRequests: builder.query({
            query: (credentials) => ({
                url: '/user/request',
            })
        }),
        reviewRequest: builder.mutation({
            query: (credentials) => ({
                url: `/request/review/${credentials?.status}/${credentials?.id}`,
                method: 'POST',
                body: credentials
            })
        }),
        sendRequest: builder.mutation({
            query: (credentials) => ({
                url: `/request/send/${credentials?.status}/${credentials?.id}`,
                method: 'POST',
                body: credentials
            })
        }),
 

    })
});

export const{ useLazyGetAllConnectionsQuery , 
    useLazyGetAllRequestsQuery ,
    useReviewRequestMutation,
    useSendRequestMutation
} = connectionApi;
