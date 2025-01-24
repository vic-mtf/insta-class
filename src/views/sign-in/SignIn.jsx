import { Box } from "@mui/material";

export default function SignIn() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      bgcolor='primary.main'
      width='100%'>
      <Box component='h1' variant='h2' color='white' textAlign='center' m={3}>
        Sign In
      </Box>
      {/* Sign in form */}
    </Box>
  );
}
