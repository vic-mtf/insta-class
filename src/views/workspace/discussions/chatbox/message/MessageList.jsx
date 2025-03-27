import { Virtuoso } from "react-virtuoso";
import MessageItem from "./MessageItem";
import DateItem from "./DateItem";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useMemo, useLayoutEffect, useRef } from "react";
import store from "../../../../../redux/store";
import { formatDateRelative } from "../../../../../utils/formatDate";
// const messages = Array.from(Array(100), (_, _id) => ({
//   _id,
//   type: Math.random() > 0.5 ? "message" : "date",
//   name: "Vic obed",
//   isSelf: Math.random() > 0.5,
// }));

export default function MessageList({ id }) {
  const discussion = useSelector((store) =>
    store.user.discussions?.find(({ _id }) => _id === id)
  );
  const bulkMessages = useSelector(() => discussion?.messages, []);
  const virtuosoRef = useRef();
  const messages = useMemo(
    () =>
      groupMessages(
        bulkMessages?.map(({ sender, ...otherProps }) => ({
          ...otherProps,
          sender,
          isSelf: store.getState().user._id === sender,
        }))
      ),
    [bulkMessages]
  );
  console.log(discussion);

  useLayoutEffect(() => {
    const virtuoso = virtuosoRef.current;
    if (virtuoso) {
      console.log(virtuoso);
      virtuoso.autoscrollToBottom();
    }
  }, [messages]);

  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={messages}
      ref={virtuosoRef}
      // initialItemCount={messages?.length - 1 || 0}
      //overscan={{ reverse: 500, main: 500 }}
      // initialScrollTop={messages?.length || 0}
      initialTopMostItemIndex={messages?.length - 1}
      itemContent={(index, { sender, itemKind, ...otherProps }) => (
        <div>
          {itemKind === "message" && (
            <MessageItem
              {...otherProps}
              isGroupedWithPrevious={messages[index - 1]?.sender === sender}
              isGroupedWithNext={messages[index + 1]?.sender === sender}
              type={discussion.type}
            />
          )}
          {itemKind === "date" && <DateItem {...otherProps} />}
        </div>
      )}
    />
  );
}

const groupMessages = (messages = []) => {
  const mss = messages.sort(
    ({ created_at: a }, { created_at: b }) => new Date(a) - new Date(b)
  );

  return mss.reduce((acc, msg) => {
    const date = formatDateRelative(msg.created_at);
    console.log(date);
    const notFound = !acc.find(
      ({ date: _date, itemKind }) => itemKind === "date" && date === _date
    );
    if (notFound) acc.push({ date, itemKind: "date" });
    acc.push({ ...msg, itemKind: "message" });
    return acc;
  }, []);
};

MessageList.propTypes = {
  id: PropTypes.string,
};
