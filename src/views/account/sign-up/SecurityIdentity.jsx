import { Box, TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import AdornmentInputHelper from "../../../components/AdornmentInputHelper";
import ErrorHelperText from "../../../components/ErrorHelperText";
import InputPassword from "../../../components/InputPassword";
import { Controller } from "react-hook-form";

const SecurityIdentity = React.forwardRef(
  ({ register, errors, control }, ref) => {
    return (
      <Box ref={ref}>
        <div>
          <TextField
            name='uname'
            {...register("uname", {
              required: texts.inputs.errors.uname.required,
              minLength: {
                value: 3,
                message: texts.inputs.errors.uname.minLength,
              },
              maxLength: {
                value: 20,
                message: texts.inputs.errors.uname.maxLength,
              },
              pattern: {
                value: /^[a-zA-Z0-9_.]{3,20}$/,
                message: texts.inputs.errors.uname.pattern,
              },
            })}
            error={Boolean(errors?.uname)}
            placeholder={texts.inputs.uname.placeholder}
            fullWidth
            type='text'
            slotProps={{
              input: {
                startAdornment: (
                  <AdornmentInputHelper rules={texts.inputs.rules.uname} />
                ),
              },
            }}
          />
          <ErrorHelperText field='uname' errors={errors} />
        </div>
        <Controller
          name='pwd'
          control={control}
          render={({ field }) =>
            passwordFields.map(({ name }) => (
              <div key={name}>
                <InputPassword
                  {...(name === "pwd" && field)}
                  {...register(name, {
                    required: texts.inputs.errors[name].required,
                    ...(name === "pwd"
                      ? {
                          minLength: {
                            value: 8,
                            message: texts.inputs.errors[name].minLength,
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: texts.inputs.errors.pwd.pattern,
                          },
                        }
                      : {
                          validate(value) {
                            return (
                              value === field.value ||
                              texts.inputs.errors.confirmPwd.noEgal
                            );
                          },
                        }),
                  })}
                  error={Boolean(errors[name])}
                  placeholder={texts.inputs[name].placeholder}
                  startAdornment={
                    <AdornmentInputHelper rules={texts.inputs.rules[name]} />
                  }
                  fullWidth
                />
                <ErrorHelperText field={name} errors={errors} />
              </div>
            ))
          }
        />
      </Box>
    );
  }
);

SecurityIdentity.displayName = "SecurityIdentity";

const passwordFields = [
  { name: "pwd", label: "Mot de passe" },
  { name: "confirmPwd", label: "Cnfirmer" },
];

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

SecurityIdentity.propTypes = {
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

export default SecurityIdentity;
