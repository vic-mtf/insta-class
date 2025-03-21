import {
  Avatar,
  Box,
  createTheme,
  ListItemAvatar,
  useTheme,
  Typography,
  CardActionArea,
} from "@mui/material";
import PropTypes from "prop-types";

export default function SnackInvitation({ src, name, onClick }) {
  const theme = useTheme();
  const defaultTheme = createTheme({
    palette: { mode: theme.palette.mode === "dark" ? "light" : "dark" },
  });
  return (
    <CardActionArea onClick={onClick}>
      <Box onClick={onClick} display='flex' flexDirection='row' minWidth={250}>
        <ListItemAvatar>
          <Avatar src={src} />
        </ListItemAvatar>
        <Box>
          <Typography>{name}</Typography>
          <Typography
            variant='body2'
            color={defaultTheme.palette.text.secondary}>
            Vous avez une invitation pour une nouvelle discussion
          </Typography>
        </Box>
      </Box>
    </CardActionArea>
  );
}

SnackInvitation.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};
