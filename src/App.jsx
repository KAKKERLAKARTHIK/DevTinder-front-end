import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.js";
import { routes } from "./routes.js";
import Body from "./Body.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectRoute.jsx";

function App() {
  // const user = useSelector((state) => state?.userProfile?.user);
  
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Body />}>
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    (
                      <route.element />
                    )
                  }
                />
              ))}
              <Route
                path="*"
                element={
                  true? <Navigate to="/feed" replace />:<Navigate to="/login" replace />
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
