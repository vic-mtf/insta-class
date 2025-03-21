import React, { useMemo } from "react";
import { Box } from "@mui/material";
import ChatBoxAppBar from "./header/ChatBoxAppBar";
import ChatBoxTextField from "./footer/ChatBoxTextField";
import MessageList from "./message/MessageList";
import { useSelector } from "react-redux";

const ChatBox = React.memo(
  React.forwardRef((props, ref) => {
    const discussionId = useSelector((store) => store.user.discussion.selected);
    const discussion = useMemo(() => ({ id: null }), []);
    if (discussionId) discussion.id = discussionId;

    return (
      <Box {...props} ref={ref} display='flex' flex={1} flexDirection='column'>
        <ChatBoxAppBar id={discussion.id} />
        <Box
          display='flex'
          flex={1}
          position='relative'
          overflow='hidden'
          flexDirection='column'>
          <MessageList id={discussion.id} />
        </Box>
        <ChatBoxTextField id={discussion.id} />
      </Box>
    );
  })
);

ChatBox.displayName = "ChatBox";

export default ChatBox;
