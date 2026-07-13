import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function NotificationMui() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/utils": "^7.1.0",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/x-data-grid": "^7.23.5",
        "@refinedev/mui": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import {
    RefineThemes,
    useNotificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import { HomePage } from "./home-page";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={RefineThemes.Blue}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider preventDuplicate={true}>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={useNotificationProvider}
                >
                    <HomePage />
                </Refine>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;

`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useNotification } from "@refinedev/core";

export const HomePage = () => {
    const { open, close } = useNotification();
    return (
        <Grid
            container
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Grid>
                <Button
                    variant="contained"
                    onClick={() => {
                        open?.({
                            type: "success",
                            message: "Notification Title",
                            description:
                                "This is the content of the notification.",
                            key: "notification-key",
                        });
                    }}
                >
                    Open Notification
                </Button>
            </Grid>
            <Grid>
                <Button
                    variant="outlined"
                    onClick={() => {
                        close?.("notification-key");
                    }}
                >
                    Close Notification
                </Button>
            </Grid>
        </Grid>
    );
};


`.trim();
