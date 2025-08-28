import React from "react";

const Login = React.lazy(() => import("./login/Login.jsx"));
const Feed = React.lazy(() => import("./feed/Feed.jsx"));
const Profile = React.lazy(() => import("./profile/EditProfile.jsx"));
const Connection = React.lazy(() => import("./conections/Connection.jsx"));
const Request = React.lazy(() => import("./requests/Requests.jsx"));

export const routes = [
  {path: "/login",element: Login  },
  {path: "/feed",element: Feed ,protected: true },
  {path: "/profile",element: Profile ,protected: true },
  {path: "/connections",element: Connection ,protected: true },
  {path: "/requests",element: Request ,protected: true },
];
