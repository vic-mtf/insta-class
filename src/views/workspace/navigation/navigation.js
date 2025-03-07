import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import WorkspaceHome from "../workspace-home/WorkspaceHome";

const navigation = [
  {
    segment: "home",
    title: "Accueil",
    icon: HomeIcon,
    component: WorkspaceHome,
  },
  {
    segment: "discussions",
    title: "Discussions",
    icon: MessageIcon,
    component: "div",
  },
  {
    segment: "invitations",
    title: "Invitations",
    icon: MarkEmailReadIcon,
    component: "div",
  },
  {
    kind: "divider",
  },
  {
    segment: "account",
    title: "Compte",
    icon: AccountCircleIcon,
    component: "div",
  },
  {
    segment: "settings",
    title: "Paramètres",
    icon: SettingsIcon,
    component: "div",
  },
];

export default navigation;
