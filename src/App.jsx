import React, { Suspense } from "react";
import NavBar from "./NavBar/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes.js";
import Body from "./Body.jsx";

function App() {
  return (
    <BrowserRouter>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes >
          <Route path="/" element={<Body/>} >
          {routes.map((route, idx) => (
            <Route key={idx} path={route.path} element={<route.element/>} />
          ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
