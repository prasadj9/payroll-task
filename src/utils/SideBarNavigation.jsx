import { Assignment, Dashboard, Group, Payment, Settings } from "@mui/icons-material";
import { PATH } from "./pagePath";

export const sideBarNavigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    segment: 'myteam',
    title: 'My Team',
    icon: <Group />,
  },
  {
    segment: 'mytask',
    title: 'My Task',
    icon: <Assignment />,
  },
  {
    segment: 'billing',
    title: 'Billing',
    icon: <Payment />,
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <Settings />,
  }
];
