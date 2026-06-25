import React from "react";
import { layoutSiderTests } from "@refinedev/ui-tests";
import { render, TestWrapper, MockRouterProvider, waitFor } from "@test";
import { ThemedLayoutContextProvider } from "@contexts";

import { ThemedSider } from "./index";

describe("Sider", () => {
  layoutSiderTests.bind(this)(ThemedSider);

  it("should render with custom width", async () => {
    const { container } = render(
      <ThemedLayoutContextProvider initialSiderCollapsed={false}>
        <ThemedSider width={250} />
      </ThemedLayoutContextProvider>,
      {
        wrapper: TestWrapper({
          routerProvider: MockRouterProvider(),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      }
    );

    await waitFor(() => {
      const siderElement = container.querySelector(".ant-layout-sider");
      expect(siderElement).toBeInTheDocument();
      expect(siderElement).toHaveStyle({
        width: "250px",
      });
    });
  });

  it("should render with custom collapsedWidth when collapsed", async () => {
    const { container } = render(
      <ThemedLayoutContextProvider initialSiderCollapsed={true}>
        <ThemedSider collapsedWidth={120} />
      </ThemedLayoutContextProvider>,
      {
        wrapper: TestWrapper({
          routerProvider: MockRouterProvider(),
          resources: [{ name: "posts", list: "/posts" }],
        }),
      }
    );

    await waitFor(() => {
      const siderElement = container.querySelector(".ant-layout-sider");
      expect(siderElement).toBeInTheDocument();
      expect(siderElement).toHaveStyle({
        width: "120px",
      });
    });
  });
});


