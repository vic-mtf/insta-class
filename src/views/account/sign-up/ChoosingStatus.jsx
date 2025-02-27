import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ChooseButton from "../../../components/ChooseButton";
// import student_image from "../../../assets/student.webp";
// import teacher_image from "../../../assets/teacher.webp";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";

const ChoosingStatus = React.forwardRef(
  ({ handleChangeSate, stateDataMem }, ref) => {
    return (
      <Box display='flex' gap={2} mt={2} flexDirection='column' ref={ref}>
        <Box
          display='flex'
          flexDirection='column'
          sx={{ "& > div": { flex: 1 } }}
          gap={1}>
          <ChooseButton
            title={texts.buttons.teacher.title}
            description={texts.buttons.teacher.description}
            onClick={() => handleChangeSate(1, "teacher")}
            icon={<ClassIcon fontSize='large' />}
            selected={stateDataMem.role === "teacher"}
          />
          <ChooseButton
            title={texts.buttons.student.title}
            description={texts.buttons.student.description}
            onClick={() => handleChangeSate(1, "student")}
            icon={<SchoolIcon fontSize='large' />}
            selected={stateDataMem.role === "student"}
          />
        </Box>
        <Typography variant='body2'>{texts.description}</Typography>
      </Box>
    );
  }
);

ChoosingStatus.displayName = "ChoosingStatus";
ChoosingStatus.propTypes = {
  control: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
  step: PropTypes.number,
  handleChangeSate: PropTypes.func.isRequired,
  stateDataMem: PropTypes.shape({
    role: PropTypes.oneOf(["student", "teacher"]),
    lastStep: PropTypes.number,
  }).isRequired,
};

export default ChoosingStatus;

const texts = {
  description:
    "Rejoignez Insta Class et Transformez Votre Apprentissage, Découvrez une nouvelle façon d'apprendre et d'enseigner que vous soyez enseignant ou élève.",
  buttons: {
    teacher: {
      title: "Je suis enseignant",
      description:
        "Créez une expérience d'apprentissage unique pour vos élèves.",
    },
    student: {
      title: "je suis élève",
      description:
        "Apprenez à utiliser votre matériel, votre écoute et votre compréhension pour apprendre.",
    },
  },
};
