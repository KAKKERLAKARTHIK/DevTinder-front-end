import React from "react";

const Login = React.lazy(() => import("./login/Login.jsx"));

export const routes = [
  {
    path: "/login",
    element: Login
  }
];
