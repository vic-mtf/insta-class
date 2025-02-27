import InputAdornment from "@mui/material/InputAdornment";
import HelpIcon from "@mui/icons-material/Help";
import { Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function AdornmentInputHelper({ rules }) {
  return (
    <Tooltip
      arrow
      enterDelay={250}
      enterTouchDelay={200}
      title={
        <Typography
          display='inline-block'
          m={0}
          pl={Array.isArray(rules) && 1.5}
          component='ul'
          variant='caption'>
          {Array.isArray(rules)
            ? rules.map((rule, index) => (
                <Typography key={index} component='li' variant='caption'>
                  {rule}
                </Typography>
              ))
            : rules}
        </Typography>
      }>
      <InputAdornment position='start'>
        <HelpIcon />
      </InputAdornment>
    </Tooltip>
  );
}

AdornmentInputHelper.propTypes = {
  rules: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
};
