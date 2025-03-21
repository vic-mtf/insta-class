import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { Box, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import formatDate from "../../../utils/formatDate";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import PollIcon from "@mui/icons-material/Poll";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import QuizIcon from "@mui/icons-material/Quiz";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const DiscussionItem = React.memo(
  ({
    src,
    name,
    sender,
    id,
    type = "private",
    content,
    at = Date.now(),
    variant = "text",
    divided = false,
    selected,
    badgeContent,
    onClick,
  }) => {
    const senderName = type === "private" ? null : sender?.fname + ":";
    return (
      <>
        <ListItem id={id} disableGutters disablePadding>
          <ListItemButton
            alignItems='flex-start'
            onClick={onClick}
            selected={selected}>
            <ListItemAvatar>
              <Avatar alt={name} src={src}>
                {icons[type]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <>
                  {senderName && <span>{senderName}</span>}
                  {senderName && " "}
                  <span>{<Variant content={content} variant={variant} />}</span>
                </>
              }
              slotProps={{
                secondary: {
                  noWrap: true,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  position: "relative",
                },
              }}
            />
            <ListItemIcon
              sx={{ justifyContent: "end", flexDirection: "column" }}>
              <Typography
                variant='caption'
                pl={0.5}
                color={badgeContent ? "primary" : "textSecondary"}>
                {formatDate(at)}
              </Typography>
              <Box margin='auto'>
                <StyledBadge badgeContent={badgeContent} color='primary'>
                  <Box width={20} height={20} />
                </StyledBadge>
              </Box>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {divided && <Divider variant='inset' component='li' />}
      </>
    );
  }
);

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    top: 10,
    border: `1.5px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Variant = ({ content, variant }) => {
  if (variant === "text") return content;

  return (
    <>
      {variant === "image" && <ImageIcon fontSize='15px' />}
      {variant === "video" && <VideocamIcon fontSize='15px' />}
      {variant === "poll" && <PollIcon fontSize='15px' />}
      {variant === "classwork" && <AutoStoriesIcon fontSize='15px' />}
      {variant === "quiz" && <QuizIcon fontSize='15px' />}
    </>
  );
};

Variant.propTypes = {
  content: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    "text",
    "note",
    "image",
    "video",
    "poll",
    "classwork",
    "quiz",
  ]),
};
const icons = {
  group: <GroupIcon />,
  school: <SchoolIcon />,
};

DiscussionItem.displayName = "DiscussionItem";
DiscussionItem.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(["private", "group", "school"]),
  content: PropTypes.string,
  at: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  divided: PropTypes.bool,
  variant: PropTypes.oneOf(["text", "note"]),
  badgeContent: PropTypes.number,
  sender: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};
export default DiscussionItem;
