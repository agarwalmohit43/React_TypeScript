import { ComponentType, LazyExoticComponent, lazy } from "react";
import { RoutePath } from "./path";

export const ComponentRoutes: {
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
}[] = [
  {
    path: RoutePath.ABOUT,
    element: lazy(() => import("../components/About")),
  },
  {
    path: RoutePath.PROFILE,
    element: lazy(() => import("../components/Profile")),
  },
  {
    path: "/",
    element: lazy(() => import("../components/Home")),
  },
];
