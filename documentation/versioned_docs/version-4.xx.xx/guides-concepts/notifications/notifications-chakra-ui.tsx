import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function NotificationChakraUI() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@chakra-ui/react": "^2.5.1",
        "@refinedev/chakra-ui": "^2.26.17",
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
import { RefineThemes, useNotificationProvider } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import { HomePage } from "./home-page";


const App: React.FC = () => {
    return (
        <ChakraProvider theme={RefineThemes.Blue}>
            <Refine
                notificationProvider={useNotificationProvider()}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            >
                <HomePage />
            </Refine>
        </ChakraProvider>
    );
};

export default App;
`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNotification } from "@refinedev/core";

export const HomePage = () => {
    const { open, close } = useNotification();

    return (
        <Flex align="center" justify="center" height="100vh" gap={4}>
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
