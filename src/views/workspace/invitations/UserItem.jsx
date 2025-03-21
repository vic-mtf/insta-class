import CardInvitation from "../../../components/CardInvitation";
import React from "react";
import PropTypes from "prop-types";
import useSocket from "../../../hooks/useSocket";
import store from "../../../redux/store";
import { updateUser } from "../../../redux/user";
import FlashWrapper from "../../../components/FlashWrapper";
import { useLocation } from "react-router-dom";

const UserItem = React.memo(({ name, role, id }) => {
  const socket = useSocket();
  const { state } = useLocation();

  return (
    <FlashWrapper shouldFlash={state?.userId === id}>
      <CardInvitation
        name={name}
        role={role}
        confirmButtonProps={{
          onClick() {
            socket.emit("accept-invitation", id, () => {
              // const filer = ({ _id }) => _id !== id;
              // const guests = store.getState().user.guests.filter(filer);
              // store.dispatch(updateUser({ data: { guests } }));
            });
          },
        }}
        deleteButtonProps={{
          onClick() {
            socket.emit("refuse-invitation", id, () => {
              const filer = ({ _id }) => _id !== id;
              const guests = store.getState().user.guests.filter(filer);
              store.dispatch(updateUser({ data: { guests } }));
            });
          },
        }}
        confirmButtonChildren='Acceter'
        deleteButtonChildren='Réfuser'
      />
    </FlashWrapper>
  );
});

UserItem.displayName = "UserItem";

UserItem.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.oneOf(["teacher", "student"]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
export default UserItem;
