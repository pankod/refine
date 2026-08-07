import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function NotificationAntd() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        antd: "^5.0.5",
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
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, App as AntdApp } from "antd";
import dataProvider from "@refinedev/simple-rest";
import "@refinedev/antd/dist/reset.css";
import { HomePage } from "./home-page";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ConfigProvider theme={RefineThemes.Blue}>
            <AntdApp>
                <Refine
                    dataProvider={dataProvider(API_URL)}
                    notificationProvider={useNotificationProvider}
                >
                    <HomePage />
                </Refine>
            </AntdApp>
        </ConfigProvider>
    );
};

export default App;

`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import { useNotification } from "@refinedev/core";
import { Button, Col, Row } from "antd";

export const HomePage: React.FC = () => {
  const { open, close } = useNotification();

  return (
      <Row
          gutter={[16, 16]}
          style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
          }}
      >
          <Col>
              <Button
                  type="primary"
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
          </Col>
          <Col>
              <Button
                  type="default"
                  onClick={() => {
                      close?.("notification-key");
                  }}
              >
                  Close Notification
              </Button>
          </Col>
      </Row>
  );
};


`.trim();
