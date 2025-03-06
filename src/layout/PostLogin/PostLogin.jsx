import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import {  createTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { sideBarNavigation } from "../../utils/sideBarNavigation";
import React, { useState } from "react";
import { clearToken, getUserEmail, getUserImage, getUserName } from "../../utils/utils";

const PostLogin = () => {
  const [session, setSession] = useState({
    user: {
      name: getUserName(),
      email: getUserEmail(),
      image: getUserImage()}
  })

  const navigate = useNavigate()
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        navigate("/login")
      },
      signOut: () => {
        setSession(null);
        clearToken();
        navigate("/login")
      },
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: 'light', // Set the mode to light
    },
  });

  return (
    <>
      <ReactRouterAppProvider navigation={sideBarNavigation} session={session} authentication={authentication} theme={theme}>
        <DashboardLayout
          slotProps={{
            appTitle : {
              branding:{
                title:"Test Field Force", 
              }
            }
          }}
        >
          <Outlet />
        </DashboardLayout>
      </ReactRouterAppProvider>
    </>
  );
};

export default PostLogin;
