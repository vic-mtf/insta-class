import React, { useMemo } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import getFile from "../../../utils/getFile";
import reduceImageQuality from "../../../utils/reduceImageQuality";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import InputPassword from "../../../components/InputPassword";
import AdornmentInputHelper from "../../../components/AdornmentInputHelper";

const EditIdentity = React.forwardRef(({ setTab, tab, ...otherProps }, ref) => {
  const dispatch = useDispatch();

  const defaultValues = useMemo(() => {
    const names = {};

    paramsFields[tab]?.forEach(({ name }) => {
      names[name] = otherProps[name];
    });

    return names;
  }, [otherProps, tab]);

  const {
    register,
    control,
    formState: { isValid, errors },
  } = useForm({ defaultValues });

  const fields = useMemo(() => paramsFields[tab], [tab]);

  //   const handleGetfile = async (files) => {
  //     const [file] = files || [];
  //     if (file) {
  //       const image = await reduceImageQuality(file);
  //       dispatch(updateUser({ data: { profile_image: image } }));
  //     }
  //   };

  return (
    <Box ref={ref} px={2}>
      <Toolbar
        disableGutters
        sx={{
          gap: 2,
        }}>
        <IconButton onClick={() => setTab(null)}>
          <ArrowBackIosIcon />
        </IconButton>

        <Typography variant='body1' color='textSecondary'>
          Modifier vos informations
        </Typography>
      </Toolbar>
      <Box sx={{ mt: 4 }} component='form'>
        {fields?.map(({ title, type, name, fields }) => (
          <Box key={title} my={1}>
            {type === "text" && (
              <TextField
                fullWidth
                type={type}
                name={name}
                label={title}
                variant='outlined'
                sx={{ mt: 1 }}
                {...register(name, {
                  required: true,
                  validate(value) {
                    return value !== defaultValues[name];
                  },
                })}
              />
            )}
            {type === "password" && (
              <Controller
                name={name}
                control={control}
                render={({ field }) =>
                  fields.map(({ name, label }) => (
                    <Box key={name} my={1}>
                      <InputPassword
                        placeholder={label}
                        {...(name === "pwd" && field)}
                        {...register(name, {
                          required: true,
                          ...(name === "pwd"
                            ? {
                                minLength: 8,
                                pattern:
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,}$/,
                              }
                            : {
                                validate(value) {
                                  return value === field.value;
                                },
                              }),
                        })}
                        startAdornment={
                          <AdornmentInputHelper
                            rules={texts.inputs.rules[name]}
                          />
                        }
                        fullWidth
                      />
                      {/* <ErrorHelperText field={name} errors={errors} /> */}
                    </Box>
                  ))
                }
              />
            )}
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={!isValid}>
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

const paramsFields = {
  fnameAndLname: [
    {
      title: "Prénom",
      type: "text",
      name: "fname",
    },
    {
      title: "Nom",
      type: "text",
      name: "lname",
    },
  ],
  uname: [
    {
      title: "Nom d'utilisateur",
      type: "text",
      name: "uname",
    },
  ],
  pwd: [
    {
      type: "password",
      name: "pwd",
      fields: [
        { name: "pwd", label: "Nouveau mot de passe" },
        { name: "confirmPwd", label: "Confirmer" },
      ],
    },
  ],
};

const texts = {
  inputs: {
    uname: {
      label: "Nom d'utilisateur",
      placeholder: "Créer votre nom d'utilisateur",
    },
    pwd: {
      label: "Mot de passe",
      placeholder: "Créer votre mot de passe",
    },
    confirmPwd: {
      label: "Confirmer le mot de passe",
      placeholder: "Confirmer votre mot de passe",
    },
    errors: {
      uname: {
        required: "Le nom d'utilisateur est obligatoire",
        maxLength: "Le nom d'utilisateur ne peut pas dépasser 20 caractères",
        minLength: "Le nom d'utilisateur doit contenir au moins 3 caractères",
        pattern:
          "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des soulignants et des tirets bas",
      },
      pwd: {
        required: "Le mot de passe est obligatoire",
        minLength: "Le mot de passe doit contenir au moins 8 caractères",
        pattern:
          "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
      },
      confirmPwd: {
        required: "Le mot de passe de confirmation est obligatoire",
        noEgal: "Les mots de passe ne sont pas identiques",
      },
    },
    rules: {
      uname: [
        "Entre 3 et 20 caractères",
        "Peut contenir des lettres, des chiffres, des underscores (_) et des points (.)",
      ],
      pwd: [
        "Au moins 8 caractères",
        "Au moins une lettre majuscule",
        "Au moins une lettre minuscule",
        "Au moins un chiffre",
        "Au moins un caractère spécial",
      ],
      confirmPwd: "Doivent être identique au mot de passe",
    },
  },
};

EditIdentity.displayName = "Idnetity";
EditIdentity.propTypes = {
  fname: PropTypes.string,
  lname: PropTypes.string,
  uname: PropTypes.string,
  profileImage: PropTypes.string,
  role: PropTypes.string,
  setTab: PropTypes.func,
  tab: PropTypes.string,
};

export default EditIdentity;
