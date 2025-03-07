import {
  Avatar,
  Box,
  Button,
  Card,
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
  Skeleton,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const SkeletonCardInvitation = React.memo(() => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return React.createElement(
    isSmall ? CardInvitationSmallScreen : CardInvitationLargeScreen
  );
});

const CardInvitationLargeScreen = () => {
  return (
    <Box>
      <Card sx={{ maxWidth: 240, minWidth: 180 }}>
        <CardMedia
          sx={{
            aspectRatio: 1,
          }}>
          <Skeleton
            variant='square'
            animation='wave'
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </CardMedia>
        <CardContent sx={{ py: 0, pt: 1, textAlign: "left" }}>
          <Typography
            gutterBottom
            variant='body1'
            component='div'
            fontWeight='bold'>
            <Skeleton animation='wave' />
          </Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            <Skeleton animation='wave' />
          </Typography>
        </CardContent>

        <CardActions sx={{ flexDirection: "column", gap: 1 }} disableSpacing>
          <Skeleton
            variant='rectangular'
            animation='wave'
            height={40}
            width='100%'
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant='rectangular'
            animation='wave'
            height={40}
            width='100%'
            sx={{ borderRadius: 1 }}
          />
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
  deleteButtonProps,
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
            Confirmer
          </Button>
          <Button
            variant='outlined'
            fullWidth
            {...deleteButtonProps}
            size='small'>
            Supprimer
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
};

CardInvitationSmallScreen.propTypes = itemPropTypes;
CardInvitationLargeScreen.propTypes = itemPropTypes;

SkeletonCardInvitation.displayName = "SkeletonCardInvitation";

export default SkeletonCardInvitation;
