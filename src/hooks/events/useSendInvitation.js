import { useEffect } from "react";
import store from "../../redux/store";
import { updateUser } from "../../redux/user";
import useSocket from "../../hooks/useSocket";

const useSendInvitation = () => {
  const socket = useSocket();

  useEffect(() => {
    //invitation-received
    const invitationReceived = ({ status, sender }) => {
      const users = [...(store.getState().user.users || [])];
      const guests = [...(store.getState().user.guest || [])];

      if (status === "create") {
        const guestIndex = guests.findIndex((g) => g === sender?._id);
        if (guestIndex === -1) guests.push(sender);
        const userIndex = users.findIndex((u) => u._id === sender?._id);
        if (userIndex > -1) users.splice(userIndex, 1);
        store.dispatch(updateUser({ data: { users, guests } }));
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
  }, [socket]);

  return null;
};

export default useSendInvitation;
