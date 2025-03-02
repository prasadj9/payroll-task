import { Assignment, Dashboard, Group, Payment, Settings } from "@mui/icons-material";
import { PATH } from "./pagePath";

export const sideBarNavigation = [
  { name: "Dashboard", path: PATH.DASHBOARD, icon: Dashboard },
  { name: "My Team", path: PATH.MYTEAM, icon: Group },
  { name: "My Task", path: PATH.MYTASK, icon: Assignment },
  { name: "Billing", path: PATH.BILLING, icon: Payment },
  { name: "Settings", path: PATH.SETTINGS, icon: Settings },
];
