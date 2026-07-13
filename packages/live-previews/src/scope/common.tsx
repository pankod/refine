import React from "react";
import * as ReactRouter from "react-router";
import type * as RefineCoreTypes from "@refinedev/core";
import * as RefineReactRouter from "@refinedev/react-router";
import * as RefineSimpleRest from "@refinedev/simple-rest";
import { RefineRest } from "./refine-rest";
import * as RefineReactHookForm from "@refinedev/react-hook-form";
import * as RefineReactTable from "@refinedev/react-table";
import * as ReactHookForm from "react-hook-form";
import * as TanstackReactTable from "@tanstack/react-table";
import * as RefineCore from "@refinedev/core";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

declare global {
  interface Window {
    routerSettings?: { initialEntries?: string[] };
    refineProps?: Partial<React.ComponentProps<typeof RefineCore.Refine>>;
    __refineIconSVGContent?: string;
    __refineTitleContent?: string;
  }
}

export const ExternalNavigationContext = React.createContext<{
  go: RefineCoreTypes.GoFunction;
  setGo: (ref: { current: RefineCoreTypes.GoFunction }) => void;
}>({
  go: () => undefined,
  setGo: () => undefined,
});

const ExternalNavigationProvider = ({ children }: React.PropsWithChildren) => {
  const [navigation, setNavigation] = React.useState<{
    current: RefineCoreTypes.GoFunction;
  }>({ current: () => undefined });

  return (
    <ExternalNavigationContext.Provider
      value={{
        go: (...args) => navigation.current(...args),
        setGo: (go) => setNavigation(go),
      }}
    >
      {children}
    </ExternalNavigationContext.Provider>
  );
};

const NavigationHandler = () => {
  const context = React.useContext(ExternalNavigationContext);
  const go = RefineCore.useGo();
  const goRef = React.useRef(go);

  React.useEffect(() => {
    if (context) {
      goRef.current = go;
      context.setGo(goRef);
    }
  }, []);

  return null;
};

const Refine = (
  props: React.ComponentProps<typeof RefineCore.Refine>,
): React.JSX.Element => {
  const { options: hiddenRefineOptions, ...hiddenRefineProps } =
    window.refineProps ?? {};
  return (
    <RefineCore.Refine
      {...props}
      options={{
        disableTelemetry: true,
        ...(props?.options || {}),
        ...(hiddenRefineOptions || {}),
        reactQuery: {
          ...(props?.options?.reactQuery || {}),
          ...(hiddenRefineOptions?.reactQuery || {}),
        },
      }}
      {...hiddenRefineProps}
    >
      {props.children}
      <NavigationHandler />
    </RefineCore.Refine>
  );
};

const setInitialRoutes = (initialEntries: string[]): void => {
  if (typeof window !== "undefined") {
    window.routerSettings = {
      initialEntries,
    };
  }
};

const setRefineProps = (
  props: Partial<React.ComponentProps<typeof RefineCore.Refine>>,
) => {
  if (typeof window !== "undefined") {
    window.refineProps = props;
  }
};

const DemoMemoryRouter = (
  props: React.ComponentProps<typeof ReactRouter.MemoryRouter>,
): React.JSX.Element => {
  return (
    <ReactRouter.MemoryRouter
      {...props}
      {...(typeof window !== "undefined" ? window.routerSettings : {})}
    />
  );
};

const RefineHeadlessDemo: React.FC<
  Partial<RefineCoreTypes.RefineProps> & {
    initialRoutes?: string[];
  }
> = ({ initialRoutes, ...rest }) => {
  if (initialRoutes) {
    setInitialRoutes(initialRoutes);
  }

  return (
    <div style={{ padding: "12px" }}>
      <Refine
        routerProvider={RefineReactRouter.default}
        dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
        options={{
          disableTelemetry: true,
        }}
        {...rest}
      />
    </div>
  );
};

export const RefineCommonScope = {
  // React
  React,
  ...React,
  // Core
  RefineCore: {
    ...RefineCore,
    ExternalNavigationProvider,
    Refine,
  },
  ReactRouter: {
    ...ReactRouter,
    BrowserRouter: DemoMemoryRouter,
  },
  // Data
  RefineSimpleRest,
  RefineRest,
  // Utilities
  setInitialRoutes,
  setRefineProps,
  RefineReactRouter,
  // UI
  RefineHeadlessDemo,
  // Other
  RefineReactHookForm,
  RefineReactTable,
  ReactHookForm,
  TanstackReactTable,
};
