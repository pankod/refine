import React, { type ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { Refine, type DataProvider, type IResourceItem } from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "./dataMocks";

interface ITestWrapperProps {
  dataProvider?: DataProvider;
  resources?: IResourceItem[];
  routerInitialEntries?: string[];
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({
  dataProvider,
  resources,
  routerInitialEntries,
}) => {
  return ({ children }): React.ReactElement => {
    return (
      <MemoryRouter initialEntries={routerInitialEntries}>
        <Refine
          dataProvider={dataProvider ?? MockJSONServer}
          routerProvider={MockRouterProvider()}
          resources={resources ?? [{ name: "posts" }]}
          options={{ disableTelemetry: true }}
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
