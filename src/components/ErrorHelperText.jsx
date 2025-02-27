import { Fade, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";

export default function ErrorHelperText({ field, errors }) {
  const show = field in errors;
  const message = show && errors[field].message;

  return (
    <Fade in={show} appear={false} style={{ minHeight: 25, paddingBottom: 5 }}>
      <FormHelperText sx={{ color: "error.main" }}>{message}</FormHelperText>
    </Fade>
  );
}

ErrorHelperText.propTypes = {
  show: PropTypes.bool,
  field: PropTypes.string,
  errors: PropTypes.object,
};
