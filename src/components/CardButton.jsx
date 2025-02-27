import { Box, Button, Typography, createTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { motion } from "motion/react";
import PropTypes from "prop-types";

const CardButton = ({ title, text, ...otherProps }) => {
  const theme = createTheme({ palette: { mode: "dark" } });
  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}>
      <Button
        size='large'
        variant='contained'
        fullWidth
        {...otherProps}
        sx={{
          flexDirection: "column",
          gap: 0,
          py: 2,
          textTransform: "none",
        }}>
        <Typography
          variant='body2'
          align='left'
          width='100%'
          sx={{ color: theme.palette.text.secondary }}>
          {title}
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          gap={1}
          width='100%'>
          <Typography variant='body1' fontWeight={500} flexGrow={1}>
            {text}
          </Typography>
          <NavigateNextIcon />
        </Box>
      </Button>
    </Box>
  );
};
CardButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default CardButton;
