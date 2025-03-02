import { AppProvider } from "@toolpad/core/AppProvider"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { useDemoRouter } from "@toolpad/core/internal"
import {sideBarNavigation} from "../../utils/sideBarNavigation"
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";

import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <DashboardIcon />,
  },
];

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

function CustomAppTitle() {
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

const PostLogin = ({children}) => {

  const router = useDemoRouter('/dashboard');
  
  return (
    <>
      <AppProvider navigation={Navigation} router={router} >
        <DashboardLayout slotProps={{
          appTitle : CustomAppTitle,

        }} >
            <DemoPageContent pathname={router.pathname}  />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};

export default PostLogin;
