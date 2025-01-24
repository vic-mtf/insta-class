import { Box, Button, Typography, alpha } from "@mui/material";
import background from "../../assets/mosaic.webp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

export default function ChooseBlock() {
  return (
    <Box
      flex={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ background: `url(${background})` }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyItems: "center",
          bgcolor: (theme) =>
            alpha(
              theme.palette.common[
                theme.palette.mode === "dark" ? "black" : "white"
              ],
              0.99
            ),
          "&::after": {
            content: "''",
            position: "absolute",
            top: 0,
            left: "-50%",
            width: "50%",
            height: "100%",
            background: (theme) =>
              `linear-gradient(90deg, transparent, ${theme.palette.background.default})`,
          },
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            right: "-50%",
            width: "50%",
            height: "100%",
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.background.default}, transparent)`,
          },
        }}>
        <div style={{ width: "100%", margin: "5% 0" }}>
          <Typography variant='h4' textAlign='center' mt={1}>
            {texts.title}{" "}
            <Typography
              variant='h4'
              component='span'
              color='primary'
              fontWeight='bold'>
              Insta-Class
            </Typography>
          </Typography>
          <Typography
            my={2}
            component='blockquote'
            pl={2}
            sx={{
              borderLeft: (theme) => `5px solid ${theme.palette.primary.main}`,
              fontSize: 40,
            }}>
            {texts.comment}
          </Typography>

          <Typography mb={1}>{texts.subTitle}</Typography>
          <Box display='flex' gap={2} my={4}>
            <Button
              variant='contained'
              LinkComponent={Link}
              size='large'
              to='/sign-up'
              endIcon={<NavigateNextIcon />}>
              {texts.buttons.createAccount}
            </Button>
            <Button
              variant='contained'
              LinkComponent={Link}
              size='large'
              to='/sign-in'
              endIcon={<NavigateNextIcon />}>
              {texts.buttons.connect}
            </Button>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

const texts = {
  buttons: {
    createAccount: "Créer un compte",
    connect: "Connectez-vous",
  },
  title: "Bienvenue sur",
  comment:
    "Je ne savais pas qu'Insta-Class pouvait faire ça Presque tout le monde",
  subTitle:
    "Insta-Class est votre partenaire idéal pour créer et délivrer des ressources pédagogiques complètes qui répondent aux besoins de chaque élève, du début à la fin de la journée scolaire. Que vous soyez enseignant ou administrateur, notre plateforme vous offre des outils puissants et intuitifs pour transformer l'apprentissage en classe.",
};
