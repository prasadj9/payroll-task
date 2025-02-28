import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from "./utils/pagePath";
import { lazy } from "react";
import PreLogin from "./layout/PreLogin/PreLogin";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
const LazyLogin = lazy(() => import("./pages/Login"));
const LazyPostLogin = lazy(() => import("./layout/PostLogin/PostLogin"));
const LazyDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const LazyMyTask = lazy(() => import("./pages/MyTask/MyTask"));


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
        <PrivateRoute component={<LazyPostLogin/>}  >

        </PrivateRoute>
    ),
    children : [
      {
        path : PATH.DASHBOARD,
        element : <LazyDashboard/>
      },
      {
        path : PATH.MYTASK,
        element : <LazyMyTask/>
      },
    ]
  },
]);
