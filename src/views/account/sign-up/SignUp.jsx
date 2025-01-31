import { Box, Toolbar, Typography } from "@mui/material";
import ChoosingStatus from "./ChoosingStatus";
import { Link } from "react-router-dom";

export default function SignUp() {
  console.log("Bonjour les gens");
  return (
    <Box
      display='flex'
      flex={1}
      flexDirection='column'
      p={5}
      textAlign='initial'>
      <Toolbar disableGutters>
        <Typography variant='h5'>{texts.title}</Typography>
      </Toolbar>
      <Box display='flex' flex={1}>
        <ChoosingStatus />
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
          to='/account/login'>
          {" "}
          {texts.footer.links.createAccount.text}
        </Typography>
      </Box>
    </Box>
  );
}

const texts = {
  title: "Créez votre compte et faites partie de l'aventure",
  errorMessages: {
    account:
      "Nom d'utilisateur ou mot de passe incorrect. Veuillez vérifier vos informations et réessayer.",
    other: "Un problème est survenu. Veuillez réessayer plus tard.",
  },
  footer: {
    quiz: { text: "Vous avez déjà un compte ?" },
    links: {
      createAccount: { text: "connectez-vous" },
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
