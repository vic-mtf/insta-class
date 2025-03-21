import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReactReduxProvider } from "react-redux";
import SocketIOProvider from "./components/SocketIOProvider";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import store from "./redux/store";
import "./styles/index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ConfigAppProvider from "./components/ConfigAppProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactReduxProvider store={store}>
      <SocketIOProvider>
        <ConfigAppProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </ConfigAppProvider>
      </SocketIOProvider>
    </ReactReduxProvider>
  </StrictMode>
);
