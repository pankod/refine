export const BASE_HEADLESS_SOURCE = `
import {
    GitHubBanner,
    Refine,
    ErrorComponent,
    WelcomePage,
} from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router";

import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route index element={<WelcomePage />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
`.trim();
