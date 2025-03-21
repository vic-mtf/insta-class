import { Box, Typography, List } from "@mui/material";
import React, { useCallback } from "react";
import DiscussionItem from "./DiscussionItem";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";
import { useSelector } from "react-redux";
import store from "../../../redux/store";
import { Virtuoso } from "react-virtuoso";
// import useLoadDiscussion from "../../../hooks/useLoadDiscussions";

const DiscussionList = React.memo(
  React.forwardRef((prop, ref) => {
    const itemContent = useCallback(
      (index, data) => (
        <WrapperDiscussionItem index={index} discussion={data} />
      ),
      []
    );
    const discussions = useSelector((store) => store.user.discussions);
    // useLoadDiscussion();
    return (
      <Box
        ref={ref}
        {...prop}
        overflow='hidden'
        display='flex'
        flexDirection='column'>
        {discussions?.length > 0 && (
          <Virtuoso
            data={discussions}
            components={{ List }}
            itemContent={itemContent}
          />
        )}
        {discussions?.length === 0 && (
          <Box
            display='flex'
            flex={1}
            justifyContent='center'
            alignItems='center'
            height='80%'>
            <Typography
              color='textSecondary'
              variant='h5'
              fontWeight={400}
              p={1}>
              Aucune discussion en cours
            </Typography>
          </Box>
        )}
      </Box>
    );
  })
);

const WrapperDiscussionItem = React.memo(({ discussion }) => {
  const at = Math.max(
    ...discussion.messages.map(({ created_at }) => new Date(created_at))
  );
  const dispatch = useDispatch();

  const lastMessage = discussion.messages.find(
    ({ created_at }) => Number(new Date(created_at)) === at
  );

  const content = lastMessage.content;
  const id = discussion._id;
  const type = discussion.type;

  const selected = useSelector(
    (store) => store.user.discussion.selected === id
  );

  const author = discussion.members.find(
    ({ _id }) => _id !== store.getState().user._id
  );

  const name =
    type === "direct" ? `${author.fname} ${author.lname}` : discussion.name;

  return (
    <DiscussionItem
      id={id}
      name={name}
      content={content}
      selected={selected}
      at={at}
      onClick={() => {
        dispatch(
          updateUser({
            data: {
              discussion: {
                selected: id,
              },
            },
          })
        );
      }}
    />
  );
});

WrapperDiscussionItem.propTypes = {
  index: PropTypes.number.isRequired,
  discussion: PropTypes.object,
};
WrapperDiscussionItem.displayName = "WrapperDiscussionItem";

DiscussionList.displayName = "DiscussionList";

export default DiscussionList;
