import { Box, TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import AdornmentInputHelper from "../../../components/AdornmentInputHelper";
import ErrorHelperText from "../../../components/ErrorHelperText";

const PersonalIdentity = React.forwardRef(({ register, errors }, ref) => {
  return (
    <Box ref={ref}>
      {fields.map(({ name, type }) => (
        <div key={name}>
          <TextField
            {...register(name, {
              required: texts.inputs.errors[name].required,
              minLength: {
                value: 2,
                message: texts.inputs.errors[name].minLength,
              },
              maxLength: {
                value: 50,
                message: texts.inputs.errors[name].maxLength,
              },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ]{2,50}$/,
                message: texts.inputs.errors[name].pattern,
              },
            })}
            error={Boolean(errors[name])}
            placeholder={texts.inputs[name].placeholder}
            fullWidth
            type={type}
            slotProps={{
              input: {
                startAdornment: (
                  <AdornmentInputHelper rules={texts.inputs.rules} />
                ),
              },
            }}
          />
          <ErrorHelperText field={name} errors={errors} />
        </div>
      ))}
    </Box>
  );
});

PersonalIdentity.displayName = "PersonalIdentity";

const fields = [
  { name: "fname", label: "Prénom", type: "text" },
  { name: "lname", label: "Nom", type: "text" },
];

const texts = {
  inputs: {
    fname: {
      label: "Prénom",
      placeholder: "Saisir votre prénom",
    },
    lname: {
      label: "Nom",
      placeholder: "Saisir votre nom",
    },
    errors: {
      fname: {
        required: "Prénom est obligatoire",
        maxLength: "Prénom ne peut pas dépasser 30 caractères",
        minLength: "Prénom doit contenir au moins 2 caractères",
        pattern: "Prénom ne peut contenir que des lettres et des espaces",
      },
      lname: {
        required: "Le nom est obligatoire",
        maxLength: "Le nom ne peut pas dépasser 50 caractères",
        minLength: "Le nom doit contenir au moins 2 caractères",
        pattern: "Le nom ne peut contenir que des lettres et des espaces",
      },
    },
    rules: [
      "Entre 2 et 50 caractères",
      "Uniquement des lettres (y compris les accents)",
    ],
  },
};

PersonalIdentity.propTypes = {
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
export default PersonalIdentity;
