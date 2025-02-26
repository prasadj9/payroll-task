import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from "./utils/pagePath";
import { lazy } from "react";
import PreLogin from "./layout/PreLogin/PreLogin";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
const LazyLogin = lazy(() => import("./pages/Login"));


export const router = createBrowserRouter([
  {
    path: PATH.DEFAULT,
    element: <Navigate to={PATH.LOGIN} replace />,
  },
  {
    element: <PublicRoute component={<PreLogin />}></PublicRoute>,
    children: [
      {
        path: PATH.LOGIN,
        element : <LazyLogin/>
      },
    ],
  },
  {
    element : (
        <PrivateRoute component={</>}  >

        </PrivateRoute>
    )
  }
]);
