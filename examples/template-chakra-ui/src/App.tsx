import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import {
  useNotificationProvider,
  RefineThemes,
  ErrorComponent,
} from "@refinedev/chakra-ui";
import { BrowserRouter, Routes, Route } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
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
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
