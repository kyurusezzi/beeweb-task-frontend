import { FC } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Workspace from "../pages/Workspace";

const routes = createRoutesFromElements(
  <Route>
    <Route path="signup" element={<SignUp />} />
    <Route path="login" element={<Login />} />
    <Route path="workspaces" element={<Workspace />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Route>
);

export const router = createBrowserRouter(routes);

const AppRouterProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
