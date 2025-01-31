import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
// import student_image from "../../../assets/student.webp";
// import teacher_image from "../../../assets/teacher.webp";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function ChoosingStatus() {
  return (
    <Box display='flex' gap={2} mt={2} flexDirection='column'>
      <Box
        display='flex'
        flexDirection='column'
        sx={{ "& > div": { flex: 1 } }}
        gap={1}>
        <ChooseButton
          title={texts.buttons.teacher.title}
          description={texts.buttons.teacher.description}
          icon={<ClassIcon fontSize='large' />}
        />
        <ChooseButton
          title={texts.buttons.student.title}
          description={texts.buttons.student.description}
          icon={<SchoolIcon fontSize='large' />}
        />
      </Box>
      <Typography>{texts.description}</Typography>
    </Box>
  );
}

const ChooseButton = ({ icon, title, description }) => {
  return (
    <Box component='div' position='relative'>
      <ListItem disableGutters>
        <ListItemButton
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
          <ListItemAvatar>
            <Avatar> {icon}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} secondary={description} />
          <ListItemIcon sx={{ justifyContent: "end" }}>
            <NavigateNextIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

ChooseButton.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
};

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
