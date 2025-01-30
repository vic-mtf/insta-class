import Home from "../views/home/Home";

const routes = [
  {
    element: Home,
    path: "/",
    children: [
      {
        path: "account",
        element: null,
      },
      {
        path: "account/login",
        element: null,
      },
      {
        path: "account/signup",
        element: null,
      },
    ],
  },
];

export default routes;
