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
const LazyMyTeam = lazy(() => import("./pages/MyTeam"));
const LazyBilling = lazy(() => import("./pages/Billing"));
const LazySettings = lazy(() => import("./pages/Settings"));


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
      {
        path : PATH.MYTEAM,
        element : <LazyMyTeam/>
      },
      {
        path : PATH.BILLING,
        element : <LazyBilling/>
      },
      {
        path : PATH.SETTINGS,
        element : <LazySettings/>
      },
    ]
  },
]);
