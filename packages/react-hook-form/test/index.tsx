import React, { type ReactNode } from "react";
import { MemoryRouter } from "react-router";
import {
  Refine,
  type DataProvider,
  type IResourceItem,
  type I18nProvider,
  type IRefineOptions,
  type RouterProvider,
} from "@refinedev/core";

import { MockJSONServer, mockRouterProvider } from "./dataMocks";
import "@testing-library/react";

interface ITestWrapperProps {
  dataProvider?: DataProvider;
  resources?: IResourceItem[];
  routerInitialEntries?: string[];
  routerProvider?: RouterProvider;
  i18nProvider?: I18nProvider;
  options?: IRefineOptions;
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({
  dataProvider,
  resources,
  routerInitialEntries,
  routerProvider,
  i18nProvider,
  options,
}) => {
  return ({ children }): React.ReactElement => {
    return (
      <MemoryRouter initialEntries={routerInitialEntries}>
        <Refine
          i18nProvider={i18nProvider}
          dataProvider={dataProvider ?? MockJSONServer}
          routerProvider={routerProvider ?? mockRouterProvider()}
          resources={resources ?? [{ name: "posts" }]}
          options={{
            ...options,
            reactQuery: {
              clientConfig: options?.reactQuery?.clientConfig ?? {
                defaultOptions: {
                  queries: {
                    retry: false,
                  },
                },
              },
            },
            disableTelemetry: true,
          }}
        >
          {children}
        </Refine>
      </MemoryRouter>
    );
  };
};
export { MockJSONServer, MockRouterProvider } from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
