import { Box, List, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import DiscussionItem from "./DiscussionItem";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";
import { useSelector } from "react-redux";
import useAxios from "../../../hooks/useAxions";
import useBearerToken from "../../../hooks/useBearerToken";
import { useEffect } from "react";
import store from "../../../redux/store";

const DiscussionList = React.memo(
  React.forwardRef((prop, ref) => {
    const itemContent = useCallback(
      (index, data) => (
        <WrapperDiscussionItem index={index} discussion={data} />
      ),
      []
    );
    const discussions = useSelector((store) => store.user.discussions);
    const dispatch = useDispatch();
    const Authorization = useBearerToken();
    const [, refresh] = useAxios(
      {
        url: "api/auth/discussions",
        headers: { Authorization },
        method: "GET",
      },
      { manual: true }
    );

    useEffect(() => {
      refresh().then((response) => {
        const data = response.data;
        dispatch(updateUser({ data: { discussions: data } }));
      });
    }, [refresh, dispatch]);

    return (
      <Box
        ref={ref}
        {...prop}
        overflow='hidden'
        display='flex'
        flexDirection='column'>
        {/* {discussions?.length > 0 && (
          <Virtuoso
            data={discussions}
            components={{
              List,
            }}
            itemContent={itemContent}
          />
        )} */}
        {
          //discussions.length === 0 &&
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
        }
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
