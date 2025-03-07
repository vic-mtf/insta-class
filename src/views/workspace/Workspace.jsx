import React from "react";
import { Box, Fade, useTheme } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import navigation from "./navigation/navigation";
import renderIcon from "../../utils/rendeIcon";
import usePathRouter from "../../hooks/usePathRouter";
import LogoApp from "../../components/LogoApp";
import { useEffect } from "react";
import store from "../../redux/store";
import { updateUser } from "../../redux/user";
import useSocket from "../../hooks/useSocket";

export default function Workspace() {
  const router = usePathRouter();
  const theme = useTheme();
  const socket = useSocket();

  useEffect(() => {
    const newUser = (user) => {
      const users = [...(store.getState().user.users || [])];
      users.push(user);
      store.dispatch(updateUser({ data: { users } }));
    };
    socket?.on("new-user", newUser);
    return () => {
      socket?.off("new-user", newUser);
    };
  }, [socket]);

  useEffect(() => {
    //send-invitation
    const sendInvitation = ({ status, guest }) => {
      const data = store.getState().user.users;
      if (data) {
        const user = {
          ...data.find((u) => u._id === guest),
          guest: status === "create",
        };
        const users = [...data];
        users[users.findIndex((u) => u._id === guest)] = user;
        store.dispatch(updateUser({ data: { users } }));
      }
    };
    socket?.on("send-invitation", sendInvitation);
    return () => {
      socket?.off("send-invitation", sendInvitation);
    };
  }, [socket]);

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
            "& .MuiStack-root .MuiTypography-h4": {
              fontSize: "1.5rem",
              marginLeft: theme.spacing(2),
            },
          }}
          maxWidth='xl'
          disableGutters>
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
                  height: "100%",
                  position: "absolute",
                }}>
                <Box position='relative' overflow='hidden' height='100%'>
                  {React.createElement(component)}
                </Box>
              </Fade>
            ))}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
