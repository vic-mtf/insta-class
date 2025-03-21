import { Virtuoso } from "react-virtuoso";
import MessageItem from "./MessageItem";
import DateItem from "./DateItem";

const messages = Array.from(Array(100), (_, _id) => ({
  _id,
  type: Math.random() > 0.5 ? "message" : "date",
  name: "Vic obed",
  isSelf: Math.random() > 0.5,
}));

export default function MessageList() {
  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={messages}
      //initialItemCount={1000}
      initialScrollTop={Infinity}
      itemContent={(_, { type, ...otherProps }) => (
        <div>
          {type === "message" && <MessageItem {...otherProps} />}
          {type === "date" && <DateItem />}
        </div>
      )}
    />
  );
}
