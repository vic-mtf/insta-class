import Home from "../views/home/Home";

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
];

export default routes;
