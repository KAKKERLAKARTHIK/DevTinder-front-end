import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../loginApi/loginApi";
import userSlice from "../slice/userSlice";
import { profileApi } from "../profileApi/profile";
import feedSlice from "../slice/feedSlice";
import { feedApi } from "../feedApi/feedApi";
import {connectionApi} from "../connectionApi/connection"
export const  store  = configureStore({
    reducer: {
        userProfile: userSlice,
        userFeed:feedSlice,
        [loginApi.reducerPath]: loginApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [feedApi.reducerPath] : feedApi.reducer,
        [connectionApi.reducerPath] : connectionApi.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        })
    .concat(loginApi.middleware)
    .concat(profileApi.middleware)
    .concat(feedApi.middleware)
    .concat(connectionApi.middleware)

})