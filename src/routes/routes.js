import Home from "../views/home/Home";
import Workspace from "../views/workspace/Workspace";
import RedirectToWorkspace from "../components/RedirectToWorkspace";

const routes = [
  {
    element: Home,
    path: "/",
    status: "private",
    children: [
      {
        path: "account",
        element: null,
        status: "private",
      },
      {
        path: "account/login",
        element: null,
        status: "private",
      },
      {
        path: "account/signup",
        element: null,
        status: "private",
      },
    ],
  },
  {
    path: "/*",
    element: RedirectToWorkspace,
    status: "protected",
  },

  {
    path: "workspace/*",
    element: Workspace,
    status: "protected",
  },
];

export default routes;
