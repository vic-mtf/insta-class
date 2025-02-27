import {
  Box,
  Paper,
  Typography,
  alpha,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import image_1 from "../../assets/depositphotos_231743108-stock-photo-portrait-female-teacher-holding-digital_1.webp";
import image_2 from "../../assets/depositphotos_589453400-stock-photo-young-african-american-woman-working_1.webp";
import image_3 from "../../assets/depositphotos_668812592-stock-photo-portrait-young-african-american-teacher_1.webp";
import SignUp from "./sign-up/SignUp";
import Login from "./login/Login";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import normalizePathname from "../../utils/normalizePathname";
import logo from "../../assets/class_room_100.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Account() {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  return (
    <Box
      display='flex'
      overflow='hidden'
      height='100dvh'
      bgcolor='primary.main'
      flexDirection='column'
      width='100%'>
      <div>
        <AppBar color='primary' position='relative' sx={{ zIndex: 100 }}>
          <Toolbar>
            <IconButton
              sx={{ color: "white", mr: 2 }}
              onClick={() => {
                try {
                  navigateTo(-1);
                } catch (e) {
                  if (e) navigateTo("/", { replace: true });
                }
              }}>
              <ArrowBackIcon />
            </IconButton>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              gap={1}>
              <Box
                component='img'
                alt='logo'
                src={logo}
                width={50}
                sx={{ filter: "grayscale(500%)" }}
              />
              <Typography
                variant='h5'
                fontWeight='bold'
                sx={{ color: "white" }}>
                Insta Class
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          component={Paper}
          textAlign='center'
          m={{ xs: 0.5, md: 3 }}
          bgcolor='background.paper'
          overflow='hidden'
          width={850}
          minWidth={0}
          minHeight={600}
          display='flex'
          flexDirection='row'>
          <Box
            flex={1}
            display='flex'
            position='relative'
            flexDirection='column'
            overflow='hidden'>
            {subViews.map(({ id, element, path }) => {
              const show = path === normalizePathname(pathname);
              const direction = id === "_login" ? "right" : "left";
              return (
                <Slide
                  key={id}
                  in={show}
                  unmountOnExit
                  direction={direction}
                  appear={false}
                  style={{
                    position: "absolute",
                    top: 1,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    zIndex: show ? 100 : 0,
                  }}>
                  <Box display='flex' flex={1} flexDirection='column'>
                    {element}
                  </Box>
                </Slide>
              );
            })}
          </Box>
          <Box
            flex={0.6}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              backgroundImage: `url(${URL_IMAGE})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              overflow: "hidden",
              filter: "contrast(150%)",
              "&::after": {
                position: "absolute",
                content: "''",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(.5px)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}>
            <Typography
              position='absolute'
              bottom={0}
              component='div'
              minWidth={0}
              padding={2}
              variant='body2'
              align='left'
              sx={{
                background: (theme) => alpha(theme.palette.common.black, 0.5),
                backdropFilter: "blur(5px)",
                color: "white",
              }}>
              {texts.pub.text}
            </Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

const texts = {
  signUp: {
    title: "Créer un compte",
    description:
      "Créez un compte pour suivre vos progressions, partager des ressources, et trouver des ressources pédagogiques adaptées à votre cursus.",
  },
  pub: {
    text: " Une expérience d'apprentissage unique pour les enseignants et les apprenants. Découvrez pourquoi les professeurs nous apprécient tant",
  },
};
const URL_IMAGE = [image_1, image_2, image_3][Math.round(Math.random() * 2)];

const subViews = [
  {
    path: "/account/signup",
    element: <SignUp />,
    id: "_signup",
  },
  {
    path: "/account/login",
    element: <Login />,
    id: "_login",
  },
  {
    path: "/account",
    element: <Navigate to='/account/login' />,
    id: "_account",
  },
];
