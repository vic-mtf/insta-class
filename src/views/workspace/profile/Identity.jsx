import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import getFile from "../../../utils/getFile";
import reduceImageQuality from "../../../utils/reduceImageQuality";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";

const Identity = React.forwardRef(
  ({ fname, lname, uname, profileImage, role, setTab }, ref) => {
    const socket = useSocket();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const informations = [
      {
        title: "Prénon Nom",
        value: `${fname} ${lname}`,
        name: "fnameAndLname",
      },
      {
        title: "Nom d'utilisateur",
        value: uname,
        name: "uname",
      },
      {
        title: "Mot de passe ",
        value: "* * * * *",
        name: "pwd",
      },
    ];

    const handleGetfile = async (files) => {
      const [file] = files || [];
      if (file) {
        const image = await reduceImageQuality(file);
        dispatch(updateUser({ data: { profile_image: image } }));
      }
    };

    return (
      <Box ref={ref} px={2}>
        <Toolbar
          disableGutters
          sx={{
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "left" },
          }}>
          <Badge
            overlap='circular'
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Box sx={{ bgcolor: "primary.main", borderRadius: 50 }}>
                <IconButton
                  sx={{ color: "#fff" }}
                  onClick={getFile(handleGetfile)}>
                  <EditIcon />
                </IconButton>
              </Box>
            }>
            <Avatar sx={{ width: 150, height: 150 }} src={profileImage} />
          </Badge>
          <Box>
            <Typography sx={{ fontSize: 32 }} fontWeight='bold'>
              {fname} {lname}
            </Typography>
            <Typography variant='body1' color='textSecondary'>
              Vous avez un compte{" "}
              {role === "teacher" ? "enseignant" : "etudiant"}
            </Typography>
          </Box>
        </Toolbar>
        <List sx={{ mt: 4 }}>
          {informations.map(({ title, value, name }, index, { length }) => (
            <React.Fragment key={title}>
              <ListItem disableGutters disablePadding>
                <ListItemButton onClick={() => setTab(name)}>
                  <ListItemText
                    primary={title}
                    secondary={value}
                    slotProps={{ primary: { variant: "body1" } }}
                  />

                  <ListItemIcon sx={{ justifyContent: "end" }}>
                    <NavigateNextIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              {index < length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              socket?.disconnect();
              dispatch(
                updateUser({
                  data: {
                    connected: false,
                  },
                })
              );
              navigateTo("/", { replace: true });
            }}
            fullWidth
            sx={{ maxWidth: { md: 400 } }}>
            Se déconnecter
          </Button>
        </Box>
      </Box>
    );
  }
);

Identity.displayName = "Idnetity";
Identity.propTypes = {
  fname: PropTypes.string,
  lname: PropTypes.string,
  uname: PropTypes.string,
  profileImage: PropTypes.string,
  role: PropTypes.string,
  setTab: PropTypes.func,
};

export default Identity;
