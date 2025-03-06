import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PreLogin = () => {
  return (
    <div>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PreLogin;
