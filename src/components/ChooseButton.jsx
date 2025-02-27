import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ChooseButton = ({ icon, title, description, selected, onClick }) => {
  return (
    <Box component='div' position='relative'>
      <ListItem disableGutters>
        <ListItemButton
          selected={selected}
          onClick={onClick}
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
          <ListItemAvatar>
            <Avatar> {icon}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} secondary={description} />
          <ListItemIcon sx={{ justifyContent: "end" }}>
            <NavigateNextIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

ChooseButton.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default ChooseButton;
