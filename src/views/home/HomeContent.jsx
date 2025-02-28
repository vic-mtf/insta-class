import { AppBar, Divider, Toolbar } from "@mui/material";
import LogoApp from "../../components/LogoApp";
import ChooseBlock from "./ChooseBlock";

export default function HomeContent() {
  return (
    <>
      <div>
        <AppBar
          color='default'
          position='relative'
          sx={{ bgcolor: "background.default", zIndex: 100, boxShadow: 0 }}>
          <Toolbar>
            <LogoApp />
          </Toolbar>
        </AppBar>
      </div>
      <Divider />
      <ChooseBlock />
    </>
  );
}
