import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material";

const MessageItem = React.memo(({ name, isSelf = false, type = "room" }) => {
  return (
    <Box display='flex' px={2}>
      <Box display='flex' width='100%'>
        {!isSelf && (
          <Box pt={2}>
            <Avatar sx={{ width: 25, height: 25 }} />
          </Box>
        )}
        <Box
          display='flex'
          flexDirection='column'
          flex={1}
          flexGrow={1}
          alignItems={isSelf ? "end" : "start"}>
          {!isSelf && type === "room" && (
            <Typography variant='caption' m={0.5}>
              {name}
            </Typography>
          )}
          <Paper
            sx={{
              mx: 0.5,
              maxWidth: "80%",
              borderRadius: 25,
              display: "inline-block",
              bgcolor: isSelf
                ? "primary.main"
                : (t) =>
                    t.palette.mode === "light" &&
                    alpha(t.palette.grey[500], 0.15),
              boxShadow: 0,
            }}
            elevation={2}>
            <Typography
              p={1.5}
              color={isSelf ? "white" : "textPrimary"}
              variant='body2'>
              Message
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
});

MessageItem.displayName = "MessageItem";

MessageItem.propTypes = {
  name: PropTypes.string,
  isSelf: PropTypes.bool,
  type: PropTypes.oneOf(["room", "direct"]),
};

export default MessageItem;
