import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import ChoosingStatus from "./ChoosingStatus";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxions";
import PersonalIdentity from "./PersonalIdentity";
import CreateAccount from "./CreateAccount";
import SecurityIdentity from "./SecurityIdentity";
import AlternativeLabelStepper from "./AlternativeLabelStepper";
import { useState } from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [{ loading, error, data }, refresh] = useAxios(
    {
      url: "/api/signup",
      method: "POST",
    },
    { manual: true }
  );
  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({});
  const stateDataMem = useMemo(() => ({ role: null, lastStep: 0 }), []);
  const handleChangeSate = useCallback(
    (newStep, role) => {
      stateDataMem.lastStep = step;
      if (role) stateDataMem.role = role;
      setStep(newStep);
    },
    [step, stateDataMem]
  );
  const onSubmit = useCallback(
    async (data) => {
      if (step === 2)
        try {
          data.role = stateDataMem.role;
          await refresh({ data });
        } catch (error) {
          console.error(error);
        }
      handleChangeSate((step) => Math.min(3, step + 1));
    },
    [stateDataMem.role, refresh, step, handleChangeSate]
  );

  return (
    <>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        p={{ xs: 1.5, md: 5 }}
        textAlign='initial'
        component='form'
        onSubmit={handleSubmit(onSubmit)}>
        <Toolbar disableGutters>
          <Typography variant='h5'>{texts.title}</Typography>
        </Toolbar>
        <Box my={1} mb={2}>
          <AlternativeLabelStepper activeStep={step} />
        </Box>
        <Box
          display='flex'
          flex={1}
          position='relative'
          overflow='hidden'
          zIndex={1}
          sx={{
            "& > div": {
              width: "100%",
              height: "100%",
              position: "absolute",
            },
          }}>
          {steps.map((Step, index) => (
            <Slide
              key={index}
              index={index}
              in={step === index}
              unmountOnExit
              direction={getStepAnimateDir(index, step, stateDataMem.lastStep)}
              appear={false}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                background: "red",
                zIndex: step === index ? 100 : 0,
              }}>
              <Step
                control={control}
                register={register}
                errors={errors}
                error={error}
                step={step}
                stateDataMem={stateDataMem}
                handleChangeSate={handleChangeSate}
              />
            </Slide>
          ))}
        </Box>
        <Fade in={step > 0 && !data}>
          <Box display='flex' justifyContent='end' mb={2} gap={1}>
            <Button
              variant='contained'
              onClick={() => handleChangeSate((step) => Math.max(step - 1, 0))}>
              {texts.footer.buttons.back.text}
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={loading || step === 3}>
              {texts.footer.buttons.next.text}
            </Button>
          </Box>
        </Fade>
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
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}

const steps = [
  ChoosingStatus,
  PersonalIdentity,
  SecurityIdentity,
  CreateAccount,
];

const getStepAnimateDir = (index, step, lastStep) => {
  if (index === step && step < lastStep) return "right";
  if (index === step && step > lastStep) return "left";
  if (step > lastStep) return "right";
  if (step < lastStep) return "left";
};

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
    buttons: {
      back: { text: "Précédent" },
      next: { text: "Continuer" },
    },
  },
  inputs: {
    password: {
      label: "Mot de passe",
      placeholder: "Saisir votre mot de passe",
    },
    username: {
      label: "Nom d'utilisateur",
      placeholder: "Saisir votre nom d'utilisateur",
    },
  },
};
