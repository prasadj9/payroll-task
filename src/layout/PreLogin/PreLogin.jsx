import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PreLogin = () => {
  return (
    <div>
      <Suspense fallback={"Dev"}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PreLogin;
