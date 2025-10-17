import { Route, Routes } from "react-router-dom";
import { ComponentRoutes } from "./routes";
import { Suspense } from "react";
export function BasicRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {ComponentRoutes.map((route) => {
          const Element = route.element;
          return (
            <Route key={route.path} path={route.path} element={<Element />} />
          );
        })}
      </Routes>
    </Suspense>
  );
}
