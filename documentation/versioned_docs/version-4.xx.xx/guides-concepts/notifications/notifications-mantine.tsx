import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function NotificationMantine() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@mantine/notifications": "^5.10.4",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@refinedev/mantine": "^2.28.21",
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
import { useNotificationProvider, RefineThemes } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import { HomePage } from "./home-page";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={RefineThemes.Blue}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={useNotificationProvider}
                >
                    <HomePage />
                </Refine>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App;

`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import { Flex, Button } from "@mantine/core";
import { useNotification } from "@refinedev/core";

export const HomePage = () => {
    const { open, close } = useNotification();

    return (
        <Flex mih={"100vh"} gap="md" justify="center" align="center">
            <Button
                onClick={() => {
                    open?.({
                        type: "success",
                        message: "Notification Title",
                        description: "This is the content of the notification.",
                        key: "notification-key",
                    });
                }}
            >
                Open Notification
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    close?.("notification-key");
                }}
            >
                Close Notification
            </Button>
        </Flex>
    );
};


`.trim();
