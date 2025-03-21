import React from "react";
import { Box, Fade, useTheme } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import navigation from "./navigation/navigation";
import renderIcon from "../../utils/rendeIcon";
import usePathRouter from "../../hooks/usePathRouter";
import LogoApp from "../../components/LogoApp";
import useInvitationReceived from "../../hooks/events/useInvitationReceived";
import useNewUser from "../../hooks/events/useNewUser";
import useSendInvitation from "../../hooks/events/useSendInvitation";
import useLoadDiscussion from "../../hooks/useLoadDiscussions";

export default function Workspace() {
  const router = usePathRouter();
  const theme = useTheme();

  useInvitationReceived();
  useNewUser();
  useSendInvitation();
  useLoadDiscussion(false);

  return (
    <AppProvider
      navigation={navigation.map(renderIcon)}
      router={router}
      theme={theme}>
      <DashboardLayout
        slots={{
          appTitle: () => <LogoApp />,
        }}>
        <PageContainer
          component='div'
          breadcrumbs={[]}
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            "& .MuiStack-root .MuiTypography-h4": {
              fontSize: "1.5rem",
              marginLeft: theme.spacing(2),
            },
          }}
          maxWidth='xl'
          disableGutters>
          <Box height='100%' position='relative'>
            {navigation
              .filter(({ segment }) => segment)
              .map(({ segment, component }) => (
                <Fade
                  key={segment}
                  in={router.pathname.includes(segment)}
                  unmountOnExit
                  appear={false}
                  style={{
                    width: "100%",
                    display: "flex",
                    height: "100%",
                    overflow: "hidden",
                    position: "absolute",
                  }}>
                  <Box
                    position='relative'
                    overflow='hidden'
                    height='100%'
                    width='100%'
                    display='flex'>
                    {React.createElement(component)}
                  </Box>
                </Fade>
              ))}
          </Box>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
