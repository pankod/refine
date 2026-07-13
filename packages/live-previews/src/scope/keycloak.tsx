import React from "react";
import * as KeycloakScope from "keycloak-js";
import * as ReactKeycloakWebScope from "@react-keycloak/web";

import { ExternalNavigationContext } from "./common";

const ReactKeycloakContext = React.createContext<{
  keycloak: {
    login: () => void;
    logout: () => void;
    token?: string;
    tokenParsed?: { family_name: string };
  };
  initialized: boolean;
}>({
  keycloak: {
    login: () => undefined,
    logout: () => undefined,
    token: undefined,
    tokenParsed: undefined,
  },
  initialized: false,
});

const ReactKeycloakProvider = ({ children }: { children: React.ReactNode }) => {
  const externalNavigator = React.useContext(ExternalNavigationContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <ReactKeycloakContext.Provider
      value={{
        initialized: true,
        keycloak: {
          login: () => {
            if (isAuthenticated) return;

            setIsAuthenticated(true);

            externalNavigator.go({ to: "/", type: "replace" });
          },
          logout: () => {
            if (isAuthenticated) {
              setIsAuthenticated(false);

              externalNavigator.go({ to: "/", type: "replace" });
            }
          },
          token: isAuthenticated ? "dummy-token" : undefined,
          tokenParsed: isAuthenticated
            ? { family_name: "John Doe" }
            : undefined,
        },
      }}
    >
      {children}
    </ReactKeycloakContext.Provider>
  );
};

const useKeycloak = () => {
  const context = React.useContext(ReactKeycloakContext);

  if (context === undefined) {
    throw new Error("useKeycloak must be used within a ReactKeycloakProvider");
  }

  return context;
};

const Keycloak = {
  KeycloakScope,
  ReactKeycloakWebScope: {
    ...ReactKeycloakWebScope,
    ReactKeycloakProvider,
    useKeycloak,
  },
};

export default Keycloak;
