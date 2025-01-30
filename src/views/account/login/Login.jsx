import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fade,
  FormControlLabel,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axios } from "../../../hooks/useAxions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    //formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data?.uname?.trim() && data?.pwd?.trim())
      try {
        console.log("Bonjour les gens");
        setLoading(true);
        setError(null);
        const response = await axios({
          method: "POST",
          url: "/api/login",
          data,
        });
        dispatch(updateUser({ data: { connected: true, ...response.data } }));
        navigateTo("/workspace", { replace: true });
      } catch (e) {
        setError(e);
        console.error(e);
      }
    setLoading(false);
  };
  return (
    <>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        p={5}
        textAlign='initial'>
        <Toolbar disableGutters>
          <Typography variant='h5'>{texts.title}</Typography>
        </Toolbar>
        <Box
          gap={2}
          display='flex'
          flexDirection='column'
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          flex={1}>
          <TextField
            fullWidth
            required
            name='uname'
            {...register("uname", { required: true })}
            placeholder={texts.inputs.username.placeholder}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            required
            placeholder={texts.inputs.password.placeholder}
            name='pwd'
            type='password'
            {...register("pwd", { required: true })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <KeyIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControlLabel control={<Checkbox />} label='Se souvenir de moi' />
          <Button variant='contained' type='submit'>
            Se connecter
          </Button>
          <Fade appear={false} unmountOnExit in={Boolean(error)}>
            <Alert severity='error'>
              {texts.errorMessages[error?.status === 401 ? "account" : "other"]}
            </Alert>
          </Fade>
        </Box>
        <Box>
          <Typography component='span' variant='body2'>
            {texts.footer.quiz.text}{" "}
          </Typography>
          <Typography
            variant='body2'
            color='primary'
            sx={{ textDecoration: "none" }}
            component={Link}
            to='/account/signup'>
            {" "}
            {texts.footer.links.createAccount.text}
          </Typography>
        </Box>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}

const texts = {
  title: "Connexion à Insta class",
  errorMessages: {
    account:
      "Nom d'utilisateur ou mot de passe incorrect. Veuillez vérifier vos informations et réessayer.",
    other: "Un problème est survenu. Veuillez réessayer plus tard.",
  },
  footer: {
    quiz: { text: "Vouns n'avez pas un compte ?" },
    links: {
      createAccount: { text: "créer un compte" },
    },
  },
  inputs: {
    // email: { label: "Email", placeholder: "Saisir votre adresse email" },
    password: {
      label: "Mot de passe",
      placeholder: "Saisir votre mot de passe",
    },
    // confirmPassword: { label: "Confirmer le mot de passe", placeholder: "Confirmer votre mot de passe" },
    username: {
      label: "Nom d'utilisateur",
      placeholder: "Saisir votre nom d'utilisateur",
    },
    // firstName: { label: "Prénom", placeholder: "Saisir votre prénom" },
    // lastName: { label: "Nom de famille", placeholder: "Saisir votre nom de famille" },
    // dateOfBirth: { label: "Date de naissance", placeholder: "Saisir votre date de naissance" },
    // gender: { label: "Sexe", placeholder: "Sélectionner votre sexe" },
  },
};
