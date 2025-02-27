import { Box, Typography, alpha } from "@mui/material";
import background from "../../assets/mosaic.webp";
import { Link } from "react-router-dom";
import CardButton from "../../components/CardButton";

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
          width: {
            xs: "95%",
            md: 800,
            lg: 900,
          },
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
        <div style={{ width: "100%", margin: "10px 0" }}>
          <Typography variant='h5' textAlign='center' mt={1}>
            {texts.title}{" "}
            <Typography
              variant='h5'
              component='span'
              color='primary'
              fontWeight='bold'>
              Insta Class
            </Typography>
          </Typography>
          <Typography
            my={2}
            component='blockquote'
            pl={2}
            sx={{
              borderLeft: (theme) => `5px solid ${theme.palette.primary.main}`,
              fontSize: 24,
            }}>
            {texts.comment}
          </Typography>

          <Typography
            mb={1}
            fontSize={18}
            color='textSecondary'
            px={5}
            fontWeight={200}>
            {texts.subTitle}
          </Typography>
          <Box
            display='flex'
            gap={2}
            my={4}
            px={2}
            sx={{
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}>
            <CardButton
              // variant='contained'
              LinkComponent={Link}
              // size='large'
              to='/account/signup'
              //endIcon={<NavigateNextIcon />}
              text={texts.buttons.createAccount.text}
              title={texts.buttons.createAccount.title}
            />
            <CardButton
              // variant='contained'
              LinkComponent={Link}
              // size='large'
              to='/account/login'
              //endIcon={<NavigateNextIcon />}
              text={texts.buttons.connect.text}
              title={texts.buttons.connect.title}
            />
          </Box>
        </div>
      </Box>
    </Box>
  );
}

const texts = {
  buttons: {
    createAccount: {
      text: "Créer un compte",
      title: "Enseignant ou élève ?",
    },
    connect: { text: "Connectez-vous", title: "J'ai déjà un compte !" },
  },
  title: "Bienvenue sur",
  comment:
    "Je ne savais pas que l'Insta Class pouvait faire ça ... ... Presque tout le monde !",
  subTitle:
    "Insta Class est votre partenaire idéal pour créer et délivrer des ressources pédagogiques complètes qui répondent aux besoins de chaque élève, du début à la fin de la journée scolaire. Que vous soyez enseignant ou élève, notre plateforme vous offre des outils puissants et intuitifs pour transformer l'apprentissage en classe.",
};
