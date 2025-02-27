import { Box, Fade } from "@mui/material";
import { useLocation } from "react-router-dom";
import HomeContent from "./HomeContent";
import Account from "../account/Account";
import normalizePathname from "../../utils/normalizePathname";

export default function Home() {
  const { pathname } = useLocation();

  return views.map(({ id, element, paths }) => (
    <Fade
      unmountOnExit
      key={id}
      appear={false}
      in={paths.includes(normalizePathname(pathname))}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        overflow: "hidden",
        overflowY: "auto",
        top: 0,
        left: 0,
      }}>
      <Box>{element}</Box>
    </Fade>
  ));
}

const views = [
  {
    paths: ["", "/"],
    element: <HomeContent />,
    id: "_home-content",
  },
  {
    paths: ["/account", "/account/login", "/account/signup"],
    element: <Account />,
    id: "_account",
  },
];
