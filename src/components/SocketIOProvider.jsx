import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
import { SocketIOContext } from "../hooks/useSocket";

let socketInstance = null;

const SocketIOProvider = React.memo(({ children }) => {
  const token = useSelector((store) => store.user.token);
  const socket = useMemo(() => {
    if (!socketInstance && token)
      socketInstance = io(import.meta.env.VITE_SERVER_BASE_URL, {
        transports: ["websocket"],
        query: { token },
      });
    return socketInstance;
  }, [token]);

  return (
    <SocketIOContext.Provider value={socket}>
      {children}
    </SocketIOContext.Provider>
  );
});
SocketIOProvider.displayName = "SocketIOProvider";

SocketIOProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketIOProvider;
