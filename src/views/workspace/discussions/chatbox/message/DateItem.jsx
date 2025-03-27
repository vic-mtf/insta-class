import { Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
export default function DateItem({ date }) {
  return (
    <Divider variant='middle' sx={{ mt: 4, mb: 1 }}>
      <Typography component='span' variant='caption' color='textSecondary'>
        {date}
      </Typography>
    </Divider>
  );
}

DateItem.propTypes = {
  date: PropTypes.string.isRequired,
};
