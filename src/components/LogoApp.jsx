import { Box, Typography } from "@mui/material";
import logo from "../assets/class_room_100.png";
import logo_white from "../assets/class_room_100_white.png";
import PropTypes from "prop-types";

export default function LogoApp({ color = "normal" }) {
  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      gap={1}>
      <Box component='img' alt='logo' src={src[color]} width={35} />
      <Typography
        variant='h6'
        fontWeight='bold'
        sx={{ color: color === "normal" ? "primary.main" : color }}>
        Insta Class
      </Typography>
    </Box>
  );
}

const src = {
  normal: logo,
  white: logo_white,
  black: logo,
};

LogoApp.propTypes = {
  color: PropTypes.oneOf(["normal", "white", "black"]),
};
