import CardInvitation from "../../../components/CardInvitation";
import React from "react";
import PropTypes from "prop-types";
import useSocket from "../../../hooks/useSocket";
import store from "../../../redux/store";
import { updateUser } from "../../../redux/user";

const UserItem = React.memo(({ name, role, id, guest }) => {
  const socket = useSocket();

  return (
    <CardInvitation
      name={name}
      role={role}
      confirmButtonProps={{
        onClick() {
          socket.emit("send-invitation", id, () => {
            const users = [...store.getState().user.users];
            const user = {
              ...users.find((u) => u._id === id),
              guest: !guest,
            };
            users[users.findIndex((u) => u._id === id)] = user;
            store.dispatch(updateUser({ data: { users } }));
          });
        },
      }}
      deleteButtonProps={{
        onClick() {
          const users = store
            .getState()
            .user.users?.filter((u) => u._id !== id);
          store.dispatch(updateUser({ data: { users } }));
        },
      }}
      confirmButtonChildren={guest ? "Annuler" : "Inviter"}
    />
  );
});

UserItem.displayName = "UserItem";

UserItem.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.oneOf(["teacher", "student"]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  guest: PropTypes.bool,
};
export default UserItem;
