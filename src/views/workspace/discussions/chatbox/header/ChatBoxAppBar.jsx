import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateUser } from "../../../../../redux/user";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import store from "../../../../../redux/store";
import getTimeAgo from "../../../../../utils/getTimeAgo";

export default function ChatBoxAppBar({ id }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const ismall = useMediaQuery(theme.breakpoints.down("md"));
  const discussion = useSelector((store) =>
    store.user.discussions?.find(({ _id }) => _id === id)
  );

  const user = useMemo(
    () =>
      discussion?.members.find(({ _id }) => _id !== store.getState().user?._id),
    [discussion?.members]
  );

  return (
    <Box width='100%'>
      <AppBar position='relative' sx={{ boxShadow: 0 }} color='default'>
        <Toolbar
          sx={{
            gap: 1,
            px: 1,
            flexDirection: {
              xs: "row",
              md: "row-reverse",
            },
          }}
          disableGutters>
          <IconButton
            onClick={() =>
              dispatch(
                updateUser({
                  data: {
                    discussion: {
                      selected: null,
                    },
                  },
                })
              )
            }>
            {ismall ? <ArrowBackIosNewIcon /> : <CloseIcon />}
          </IconButton>
          <Box flexGrow={1}>
            <ListItem disableGutters disablePadding>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={`${user?.fname} ${user?.lname}`}
                secondary={<Status user={user} />}
              />
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Status = ({ user }) => {
  const lastLoginedAt = user?.last_logined_at;
  console.log(lastLoginedAt);
  const online = user?.status === "online";
  return online ? "En ligne" : getTimeAgo(lastLoginedAt);
};

ChatBoxAppBar.propTypes = {
  id: PropTypes.string,
};
