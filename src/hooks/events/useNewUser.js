import { useEffect } from "react";
import store from "../../redux/store";
import { updateUser } from "../../redux/user";
import useSocket from "../../hooks/useSocket";

const useNewUser = () => {
  const socket = useSocket();
  useEffect(() => {
    const newUser = (user) => {
      const users = [...(store.getState().user.users || [])];
      const userIndex = users.findIndex((u) => u._id === user._id);
      if (userIndex > -1) users[userIndex] = user;
      else users.push(user);
      store.dispatch(updateUser({ data: { users } }));
    };
    socket?.on("new-user", newUser);
    return () => {
      socket?.off("new-user", newUser);
    };
  }, [socket]);

  return null;
};

export default useNewUser;
