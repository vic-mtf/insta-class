import { Divider, Typography } from "@mui/material";

export default function DateItem() {
  return (
    <Divider variant='middle'>
      <Typography component='span' variant='caption' color='textSecondary'>
        Today, January 15, 2022
      </Typography>
    </Divider>
  );
}
