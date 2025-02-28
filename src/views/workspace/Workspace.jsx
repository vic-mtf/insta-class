import React from "react";
import { Fade, useTheme } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import navigation from "./navigation/navigation";
import renderIcon from "../../utils/rendeIcon";
import usePathRouter from "../../hooks/usePathRouter";
import LogoApp from "../../components/LogoApp";

export default function Workspace() {
  const router = usePathRouter();
  const theme = useTheme();

  return (
    <AppProvider
      navigation={navigation.map(renderIcon)}
      router={router}
      theme={theme}>
      <DashboardLayout
        slots={{
          appTitle: () => <LogoApp />,
        }}>
        <PageContainer>
          {navigation
            .filter(({ segment }) => segment)
            .map(({ segment, component }) => (
              <Fade key={segment} in={router.pathname.includes(segment)}>
                {React.createElement(component)}
              </Fade>
            ))}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
