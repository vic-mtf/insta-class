import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/class_room_100.png";
import ChooseBlock from "./ChooseBlock";

export default function Home() {
  return (
    <>
      <div>
        <AppBar
          color='default'
          position='relative'
          sx={{ bgcolor: "background.default", zIndex: 100, boxShadow: 0 }}>
          <Toolbar>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              gap={1}>
              <Box component='img' alt='logo' src={logo} width={50} />
              <Typography
                variant='h5'
                fontWeight='bold'
                sx={{ color: "primary.main" }}>
                Insta Class
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      <Divider />
      <ChooseBlock />
    </>
  );
}
