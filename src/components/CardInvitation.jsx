import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material";

const CardInvitation = React.memo((props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return React.createElement(
    isSmall ? CardInvitationSmallScreen : CardInvitationLargeScreen,
    { ...props }
  );
});

const CardInvitationLargeScreen = ({
  name = "Obed Mbo lubama",
  role,
  src,
  confirmButtonProps,
  confirmButtonChildren = "confirmer",
  deleteButtonProps,
  deleteButtonChildren = "supprimer",
}) => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 240,
          minWidth: 180,
          background: (t) => alpha(t.palette.background.paper, 0.6),
        }}>
        <CardActionArea>
          <CardMedia
            sx={{
              aspectRatio: 1,
            }}>
            <Avatar
              variant='square'
              sx={{ width: "100%", height: "100%" }}
              src={src}
            />
          </CardMedia>
          <CardContent sx={{ py: 0, pt: 1, textAlign: "left" }}>
            <Typography
              gutterBottom
              variant='body1'
              component='div'
              fontWeight='bold'>
              {name}
            </Typography>
            <Typography variant='body2' sx={{ color: "text.secondary" }}>
              {role === "teacher" ? "Enseignat" : "Etudiant"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ flexDirection: "column", gap: 1 }} disableSpacing>
          <Button variant='contained' fullWidth {...confirmButtonProps}>
            {confirmButtonChildren}
          </Button>
          <Button variant='outlined' fullWidth {...deleteButtonProps}>
            {deleteButtonChildren}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const CardInvitationSmallScreen = ({
  name = "Obed Mbo lubama",
  src,
  role,
  confirmButtonProps,
  confirmButtonChildren = "confirmer",
  deleteButtonProps,
  deleteButtonChildren = "supprimer",
}) => {
  return (
    <ListItem
      disableGutters
      disablePadding
      alignItems='flex-start'
      sx={{
        flexDirection: "column",
        "& > .MuiListItemButton-root": {
          width: "100%",
        },
        "& > .MuiListItemSecondaryAction-root": {
          position: "relative",
          mt: -2.5,
          bottom: 2.5,
          pl: 11,
        },
      }}
      secondaryAction={
        <Box display='flex' flexDirection='row' position='relative' gap={1}>
          <Button
            variant='contained'
            fullWidth
            {...confirmButtonProps}
            size='small'>
            {confirmButtonChildren}
          </Button>
          <Button
            variant='outlined'
            fullWidth
            {...deleteButtonProps}
            size='small'>
            {deleteButtonChildren}
          </Button>
        </Box>
      }>
      <ListItemButton alignItems='flex-start' disableGutters>
        <ListItemAvatar
          sx={{
            width: 80,
            height: 80,
            mr: 1,
          }}>
          <Avatar src={src} sx={{ width: "100%", height: "100%" }} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          slotProps={{
            primary: {
              fontWeight: "bold",
            },
          }}
          secondary={
            <Typography variant='body2' sx={{ color: "text.secondary" }} mb={1}>
              {role === "teacher" ? "Enseignat" : "Etudiant"}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

const itemPropTypes = {
  name: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(URL)]),
  confirmButtonProps: PropTypes.object,
  deleteButtonProps: PropTypes.object,
  role: PropTypes.oneOf(["teacher", "student"]),
  confirmButtonChildren: PropTypes.node,
  deleteButtonChildren: PropTypes.node,
};

CardInvitationSmallScreen.propTypes = itemPropTypes;
CardInvitationLargeScreen.propTypes = itemPropTypes;

CardInvitation.displayName = "CardInvitation";

export default CardInvitation;
