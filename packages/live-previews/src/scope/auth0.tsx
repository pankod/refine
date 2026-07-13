import * as Auth0ReactScope from "@auth0/auth0-react";
import React from "react";
import { ExternalNavigationContext } from "./common";

const Auth0Context = React.createContext<{
  isLoading: boolean;
  user?: {
    picture: string;
    name: string;
    email: string;
  };
  logout: () => void;
  getIdTokenClaims: () => { __raw: string } | undefined;
  loginWithRedirect: () => void;
}>({
  isLoading: false,
  user: undefined,
  logout: () => undefined,
  getIdTokenClaims: () => undefined,
  loginWithRedirect: () => undefined,
});

const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const externalNavigator = React.useContext(ExternalNavigationContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Auth0Context.Provider
      value={{
        isLoading: false,
        user: isAuthenticated
          ? {
              picture: "",
              name: "John Doe",
              email: "example@example.com",
            }
          : undefined,
        logout: () => {
          if (isAuthenticated) {
            setIsAuthenticated(false);

            externalNavigator.go({ to: "/login", type: "replace" });
          }
        },
        getIdTokenClaims: () => {
          if (isAuthenticated) {
            return { __raw: "dummy-token" };
          }

          return undefined;
        },
        loginWithRedirect: () => {
          if (isAuthenticated) return;

          setIsAuthenticated(true);

          externalNavigator.go({ to: "/", type: "replace" });
        },
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

const useAuth0 = () => {
  const context = React.useContext(Auth0Context);

  if (context === undefined) {
    throw new Error("useAuth0 must be used within a Auth0Provider");
  }

  return context;
};

const Auth0Scope = {
  Auth0ReactScope: {
    ...Auth0ReactScope,
    useAuth0,
    Auth0Provider,
  },
};

export default Auth0Scope;
