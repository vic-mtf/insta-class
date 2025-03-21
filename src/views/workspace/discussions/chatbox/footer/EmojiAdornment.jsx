import {
  Box,
  ClickAwayListener,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import "emoji-picker-element";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { tooltipClasses } from "@mui/material/Tooltip";
import EmojiPicker from "../../../../../components/EmojPiker";

const EmojiAdornment = React.memo(({ onClick }) => {
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <NoMaxWidthTooltip
          open={open}
          arrow
          placement='top-start'
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          slotProps={{
            popper: {
              //disablePortal: true,
              sx: {
                p: 0,
                m: 0,
                [`& .${tooltipClasses.tooltip}`]: {
                  p: 1,
                  m: 0,
                  //overflow: "hidden",
                },
              },
            },
          }}
          sx={{
            p: 0,
            m: 0,
            display: "inline-block",
          }}
          title={
            <Box>
              <EmojiPicker onClickEmoji={onClick} />
            </Box>
          }>
          <IconButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setOpen((e) => !e)}>
            <InsertEmoticonIcon />
          </IconButton>
        </NoMaxWidthTooltip>
      </div>
    </ClickAwayListener>
  );
});

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

EmojiAdornment.displayName = "EmojiAdornment";

EmojiAdornment.propTypes = {
  onClick: PropTypes.func,
};
export default EmojiAdornment;
