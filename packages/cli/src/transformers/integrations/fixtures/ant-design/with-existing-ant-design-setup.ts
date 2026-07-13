export const WITH_EXISTING_ANT_DESIGN_SETUP_SOURCE = `
import { Refine, WelcomePage } from "@refinedev/core";

import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

function App() {
    return (
        <ConfigProvider theme={RefineThemes.Blue}>
            <AntdApp>
                <Refine notificationProvider={useNotificationProvider}>
                    <WelcomePage />
                </Refine>
            </AntdApp>
        </ConfigProvider>
    );
}

export default App;`.trim();
