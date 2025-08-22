import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../loginApi/loginApi";
import userSlice from "../slice/userSlice";
import { profileApi } from "../profileApi/profile";
export const  store  = configureStore({
    reducer: {
        userProfile: userSlice,
        [loginApi.reducerPath]: loginApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        })
    .concat(loginApi.middleware)
    .concat(profileApi.middleware)

})