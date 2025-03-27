import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material";

const MessageItem = React.memo(
  ({
    name,
    isSelf = false,
    type = "room",
    content,
    isGroupedWithPrevious,
    isGroupedWithNext,
  }) => {
    return (
      <Box
        display='flex'
        px={2}
        mt={isGroupedWithPrevious ? 0.25 : 4}
        mb={isGroupedWithNext ? 0.25 : 4}>
        <Box display='flex' width='100%' position='relative'>
          {!isSelf && (
            <Box pt={2} sx={{ width: 25, height: 25 }}>
              <Box display={isGroupedWithPrevious ? "none" : "block"}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    top: -10,
                  }}
                />
              </Box>
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
                maxHeight: { xs: 300, md: 400 },
                borderRadius: `${
                  isGroupedWithPrevious
                    ? isSelf
                      ? "5px 0px"
                      : "0px 5px"
                    : `${isSelf ? "15px 0px" : "5px 15px"}`
                } ${
                  isGroupedWithNext
                    ? isSelf
                      ? "0px 5px"
                      : "5px 0px"
                    : `${isSelf ? "0px 15px" : "15px 0px"}`
                }`,
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
                variant='body2'
                textOverflow='ellipsis'
                overflow='hidden'
                height='100%'>
                {content}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    );
  }
);

MessageItem.displayName = "MessageItem";

MessageItem.propTypes = {
  name: PropTypes.string,
  isSelf: PropTypes.bool,
  type: PropTypes.oneOf(["room", "direct"]),
  content: PropTypes.string,
  isGroupedWithPrevious: PropTypes.bool,
  isGroupedWithNext: PropTypes.bool,
};

export default MessageItem;
