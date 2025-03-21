import React, { useEffect } from "react";
import store from "../../redux/store";
import { updateUser } from "../../redux/user";
import useSocket from "../../hooks/useSocket";
import { useNotifications } from "@toolpad/core";
import SnackInvitation from "../../components/SnackInvitation";
import { useNavigate } from "react-router-dom";

const useInvitationReceived = () => {
  const socket = useSocket();
  const notifications = useNotifications();
  const navigateTo = useNavigate();

  useEffect(() => {
    //invitation-received
    const invitationReceived = ({ status, sender }) => {
      const users = [...(store.getState().user.users || [])];
      const guests = [...(store.getState().user.guests || [])];
      console.log(sender, status);
      if (status === "create") {
        const guestIndex = guests.findIndex((g) => g?._id === sender?._id);
        if (guestIndex === -1) guests.push(sender);
        const userIndex = users.findIndex((u) => u._id === sender?._id);
        if (userIndex > -1) users.splice(userIndex, 1);
        store.dispatch(updateUser({ data: { users, guests } }));
        const notification = notifications.show(
          React.createElement(SnackInvitation, {
            name: `${sender.fname} ${sender.lname}`,
            src: sender.profile_image,
            onClick: () => {
              notifications.close(notification);
              navigateTo("/workspace/invitations", {
                state: {
                  userId: sender?._id,
                },
              });
            },
          })
        );
      } else {
        const guestIndex = guests.findIndex((g) => g === sender?._id);
        if (guestIndex > -1) guests.splice(guestIndex, 1);
        const userIndex = users.findIndex((u) => u._id === sender?._id);
        if (userIndex === -1) users.push({ ...sender, guest: true });
        store.dispatch(updateUser({ data: { users, guests } }));
      }
    };

    socket?.on("invitation-received", invitationReceived);
    return () => {
      socket?.off("invitation-received", invitationReceived);
    };
  }, [socket, notifications, navigateTo]);

  return null;
};

export default useInvitationReceived;
