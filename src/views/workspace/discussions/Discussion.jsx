import React from "react";
import { Chip, Divider, Fade, useMediaQuery } from "@mui/material";
import { Box, Slide, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import DionListcussionList from "./DiscussionList";
import ChatBox from "./chatbox/ChatBox";
import PropTypes from "prop-types";

export default function Discussion() {
  const theme = useTheme();
  const selected = useSelector((store) =>
    Boolean(store.user.discussion.selected)
  );
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      position='relative'
      width='100%'
      display='flex'
      sx={{
        "& > div": {
          position: {
            md: "relative",
            xs: "absolute",
          },
          top: 0,
          left: 0,
          display: "flex",
          height: "100%",
          overflow: "hidden",
        },
      }}>
      <Slide
        style={{ width: isSmall ? "100%" : 400 }}
        direction='right'
        in={isSmall ? !selected : true}
        appear={false}
        unmountOnExit>
        <DionListcussionList />
      </Slide>
      <Divider variant='fullWidth' orientation='vertical' />
      <Slide
        appear={false}
        in={isSmall ? selected : true}
        direction='left'
        unmountOnExit>
        <ChatContent isSmall={isSmall} selected={selected} />
      </Slide>
    </Box>
  );
}

const ChatContent = React.forwardRef(
  ({ isSmall, selected, ...otherProps }, ref) => {
    return (
      <Box
        position='relative'
        ref={ref}
        height='100%'
        width='100%'
        display='flex'
        sx={{
          "& > div": {
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            flex: 1,
          },
        }}>
        <Fade appear={false} unmountOnExit in={isSmall ? true : selected}>
          <ChatBox {...otherProps} />
        </Fade>
        <Fade
          {...otherProps}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          appear={false}
          in={isSmall ? false : !selected}
          unmountOnExit>
          <div>
            <Chip
              variant='outlined'
              label='Sélectionnez un contact pour démarrer la discussion'
            />
          </div>
        </Fade>
      </Box>
    );
  }
);

ChatContent.propTypes = {
  isSmall: PropTypes.bool,
  selected: PropTypes.bool,
};
ChatContent.displayName = "ChatContent";
