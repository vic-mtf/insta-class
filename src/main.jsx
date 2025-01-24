import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReactReduxProvider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import store from "./redux/store";
import "./styles/index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2596be",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ReactReduxProvider>
  </StrictMode>
);
