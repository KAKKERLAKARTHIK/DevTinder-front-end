import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedApi = createApi({
    reducerPath: 'feedApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://13.60.90.43:3000",
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: () => '/all/feed',
            transformResponse: (response) => { 
                if (Array.isArray(response?.data)) {
                    return response;
                }
                if (response?.data && typeof response?.data === "object") {
                    return [response?.data];
                }
                return [];
            },
        }),

    }),
});

export const { useLazyGetFeedQuery } = feedApi;
