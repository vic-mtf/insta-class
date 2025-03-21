import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { alpha } from "@mui/material";
import PropTypes from "prop-types";

const FlashWrapper = ({ children, duration = 3000, shouldFlash = false }) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (shouldFlash) {
      setIsFlashing(true);
      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [shouldFlash, duration]);

  return (
    <Box
      component='div'
      sx={{
        "@keyframes flash": {
          "0%, 100%": {
            backgroundColor: "transparent",
          },
          "50%": {
            backgroundColor: (t) => alpha(t.palette.primary.main, 0.5),
            display: "flex",
            justifyContent: 1,
            alignItems: "center",
          },
        },

        animation: isFlashing && "flash 1s ease-in-out infinite",
        p: 0.25,
        borderRadius: 1,
      }}>
      {children}
    </Box>
  );
};

FlashWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  duration: PropTypes.number,
  shouldFlash: PropTypes.bool,
};

export default FlashWrapper;
