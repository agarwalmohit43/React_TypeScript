import { Route, Routes } from "react-router-dom";
import { ComponentRoutes } from "./routes";
import { Suspense } from "react";
import ProtectedRoute from "../ProtectedRoute";
export function BasicRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {ComponentRoutes.map((route) => {
            const Element = route.element;
            return (
              <Route key={route.path} path={route.path} element={<Element />} />
            );
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}
