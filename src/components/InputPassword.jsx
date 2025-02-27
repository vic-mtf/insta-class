import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import propTypes from "prop-types";

const InputPassword = React.forwardRef(
  ({ id, fullWidth, ...otherProps }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    return (
      <FormControl variant='outlined' fullWidth={fullWidth}>
        {/* <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel> */}
        <OutlinedInput
          ref={ref}
          id={id}
          {...otherProps}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
);

InputPassword.displayName = "InputPassword";

InputPassword.propTypes = {
  id: propTypes.string,
  fullWidth: propTypes.bool,
};

export default InputPassword;
