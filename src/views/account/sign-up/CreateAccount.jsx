import { Alert, AlertTitle, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const CreateAccount = React.forwardRef(({ error }, ref) => {
  const status = error?.status || "default";
  const title = error ? texts.errors[status].title : texts.success.title;
  const message = error ? texts.errors[status].message : texts.success.message;

  return (
    <Box ref={ref} my={4}>
      <Alert severity={error ? "error" : "success"}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
});

const texts = {
  success: {
    title: "Votre compte a été créé avec succès",
    message:
      "Vous pouvez vous connecter à votre compte pour commencer à utiliser l'application",
  },

  errors: {
    409: {
      title: "Nom d'utilisateur déjà utilisé",
      message: "Veuillez choisir un autre nom d'utilisateur",
    },
    400: {
      title: "Erreur de validation des données",
      message: "Veuillez vérifier les informations fournies et réessayer",
    },
    500: {
      title: "Un erreur est survenue",
      message:
        "Nous avons rencontré un problème lors de la création de votre compte. Veuillez réessayer plus tard",
    },
    default: {
      title: "Erreur lors de la création de votre compte",
      message: "Veuillez réessayer plus tard",
    },
  },
};

CreateAccount.displayName = "CreateAccount";
CreateAccount.propTypes = {
  control: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
  error: PropTypes.object,
  step: PropTypes.number,
  stateDataMem: PropTypes.shape({
    role: PropTypes.oneOf(["student", "teacher"]),
    lastStep: PropTypes.number,
  }),
};

export default CreateAccount;
