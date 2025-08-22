import React from "react";

const Login = React.lazy(() => import("./login/Login.jsx"));
const Feed = React.lazy(() => import("./feed/Feed.jsx"));

export const routes = [
  {path: "/login",element: Login  },
  {path: "/feed",element: Feed ,protected: true },
];
