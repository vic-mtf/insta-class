import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useAutoMode from "./useAutoMode";

const useTheme = (defaultMode) => {
  const autoMode = useAutoMode();
  const themeMode = useSelector((store) => store.app.theme.mode);

  const mode = useMemo(
    () => defaultMode || (themeMode === "auto" ? autoMode : themeMode),
    [themeMode, autoMode, defaultMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#2596be" },
          //background: { ...otherKey, paper },
        },
      }),
    [mode]
  );

  return theme;
};

export default useTheme;
