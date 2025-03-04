import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PreLogin = () => {
  return (
    <div>
      <Suspense fallback={"Loading"}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PreLogin;
