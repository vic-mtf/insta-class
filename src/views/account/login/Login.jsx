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
import useAxios from "../../../hooks/useAxions";
import InputPassword from "../../../components/InputPassword";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/user";
import { updateApp } from "../../../redux/app";
import store from "../../../redux/store";
import { encrypt } from "../../../utils/crypt";
import useUserData from "../../../hooks/useUserData";
import { useLayoutEffect } from "react";

export default function Login() {
  const [{ loading, error, data }, refesh] = useAxios(
    { method: "POST", url: "/api/login" },
    { manual: true }
  );
  const connected = useSelector((store) => store.user.connected);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const defaulUser = useUserData();

  const {
    register,
    handleSubmit,
    // watch,
    //formState: { errors },
  } = useForm({ defaultValues: { ...defaulUser } });

  const onSubmit = async (data) => {
    if (data?.uname?.trim() && data?.pwd?.trim())
      try {
        const response = await refesh({ data });
        const { app } = store.getState();
        dispatch(updateUser({ data: { connected: true, ...response.data } }));
        dispatch(
          updateApp({ data: { user: app.remembered ? encrypt(data) : null } })
        );
      } catch (e) {
        if (e) console.error(e);
      }
  };

  useLayoutEffect(() => {
    return () => {
      if (data || connected) navigateTo("/workspace", { replace: true });
    };
  }, [data, navigateTo, connected]);
  return (
    <>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        sx={{
          p: { xs: 1.2, md: 4 },
        }}
        textAlign='initial'>
        <Toolbar disableGutters>
          <Typography variant='h5'>{texts.title}</Typography>
        </Toolbar>
        <Box
          gap={2}
          display='flex'
          flexDirection='column'
          component='form'
          pt={2}
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
          <InputPassword
            fullWidth
            required
            placeholder={texts.inputs.password.placeholder}
            name='pwd'
            type='password'
            {...register("pwd", { required: true })}
            startAdornment={
              <InputAdornment position='start'>
                <KeyIcon />
              </InputAdornment>
            }
          />
          <RememberCheckbox />
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

const RememberCheckbox = () => {
  const checkbox = useSelector((store) => store.app.remembered);
  const dispatch = useDispatch();
  return (
    <FormControlLabel
      checked={checkbox}
      onChange={(_, remembered) =>
        dispatch(updateApp({ data: { remembered } }))
      }
      control={<Checkbox />}
      label='Se souvenir de moi'
    />
  );
};

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
