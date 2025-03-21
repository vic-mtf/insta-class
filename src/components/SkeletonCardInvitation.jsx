import {
  Box,
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
      <Card
        sx={{
          maxWidth: 240,
          minWidth: 180,
          boxShadow: 0,
          border: (t) => `1px solid ${t.palette.divider}`,
        }}>
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

const CardInvitationSmallScreen = () => {
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
        <Box
          display='flex'
          flexDirection='row'
          position='relative'
          gap={1}
          sx={{
            "& >  div": {
              borderRadius: 1,
              width: 100,
              height: 40,
            },
          }}>
          <Skeleton variant='rectangular' component='div'></Skeleton>
          <Skeleton variant='rectangular' component='div'></Skeleton>
        </Box>
      }>
      <ListItemButton alignItems='flex-start' disableGutters>
        <ListItemAvatar
          sx={{
            width: 80,
            height: 80,
            mr: 1,
          }}>
          <Skeleton variant='circular' sx={{ width: "100%", height: "100%" }} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant='text' />}
          slotProps={{
            primary: {
              fontWeight: "bold",
            },
          }}
          secondary={<Skeleton variant='text' sx={{ maxWidth: "60%" }} />}
        />
      </ListItemButton>
    </ListItem>
  );
};

SkeletonCardInvitation.displayName = "SkeletonCardInvitation";

export default SkeletonCardInvitation;
