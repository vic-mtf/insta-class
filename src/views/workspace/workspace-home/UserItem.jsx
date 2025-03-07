import CardInvitation from "../../../components/CardInvitation";
import React from "react";
import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxions";
import useBearerToken from "../../../hooks/useBearerToken";
import useSocket from "../../../hooks/useSocket";
import store from "../../../redux/store";
import { updateUser } from "../../../redux/user";

const UserItem = React.memo(({ name, role, id, guest }) => {
  const Authorization = useBearerToken();
  const socket = useSocket();
  const [{ loading }] = useAxios(
    {
      method: "POST",
      headers: { Authorization },
      url: "/auth/invitations/" + id,
    },
    { manual: true }
  );
  return (
    <CardInvitation
      name={name}
      role={role}
      confirmButtonProps={{
        disabled: loading,
        onClick() {
          socket.emit("send-invitation", id, () => {
            const user = {
              ...store.getState().user.users.find((u) => u._id === id),
              guest: !guest,
            };
            const users = [...store.getState().user.users];
            users[users.findIndex((u) => u._id === id)] = user;
            store.dispatch(updateUser({ data: { users } }));
          });
        },
      }}
      deleteButtonProps={{ disabled: loading }}
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
