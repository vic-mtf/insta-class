import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import InvitationBadgeIcon from "./InvitationBadgeIcon";
import WorkspaceHome from "../workspace-home/WorkspaceHome";
import Invitations from "../invitations/Invitations";
import Discussion from "../discussions/Discussion";
import Profile from "../profile/Profile";
import Params from "../params/Params";

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
    component: Discussion,
  },
  {
    segment: "invitations",
    title: "Invitations",
    icon: InvitationBadgeIcon,
    component: Invitations,
  },
  {
    kind: "divider",
  },
  {
    segment: "account",
    title: "Compte",
    icon: AccountCircleIcon,
    component: Profile,
  },
  {
    segment: "settings",
    title: "Paramètres",
    icon: SettingsIcon,
    component: Params,
  },
];

export default navigation;
