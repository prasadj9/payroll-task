import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Chip, createTheme, Stack, Tooltip, Typography } from "@mui/material";

import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Outlet, useNavigate } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { sideBarNavigation } from "../../utils/sideBarNavigation";
import React, { useState } from "react";
import { clearToken, getUserEmail, getUserImage, getUserName } from "../../utils/utils";

function CustomAppTitle() {
  console.log("App")
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CloudCircleIcon fontSize="large" color="primary" />
      <Typography variant="h6">My App</Typography>
      <Chip size="small" label="BETA" color="info" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

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
            appTitle : CustomAppTitle
          }}
        >
          <Outlet />
        </DashboardLayout>
      </ReactRouterAppProvider>
    </>
  );
};

export default PostLogin;
