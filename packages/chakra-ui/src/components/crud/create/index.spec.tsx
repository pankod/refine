import React from "react";

import { Route, Routes } from "react-router";

import { render, TestWrapper, MockRouterProvider } from "@test";
import { Create } from "./";
import { crudCreateTests } from "@refinedev/ui-tests";
import { SaveButton } from "@components/buttons";
import { RefineButtonTestIds } from "@refinedev/ui-types";

describe("Create", () => {
  crudCreateTests.bind(this)(Create);

  it("should render breadcrumb", async () => {
    const { getAllByLabelText } = render(
      <Routes>
        <Route
          path="/:resource/:action"
          element={<Create resource="posts" />}
        />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
          resources: [
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              meta: {
                label: "Posts",
              },
            },
          ],
          routerProvider: {
            ...MockRouterProvider(),
            parse: () => () => ({
              params: {},
              action: "create",
              resource: {
                name: "posts",
                list: "/posts",
                create: "/posts/create",
                meta: { label: "Posts" },
              },
              pathname: "/posts/create",
            }),
          },
        }),
      },
    );

    expect(getAllByLabelText("breadcrumb")).not.toBeNull();
  });
  it("should not render breadcrumb", async () => {
    const { queryByLabelText } = render(
      <Routes>
        <Route
          path="/:resource/:action"
          element={<Create resource="posts" breadcrumb={null} />}
        />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
        }),
      },
    );

    expect(queryByLabelText("breadcrumb")).not.toBeInTheDocument();
  });

  it("should customize default buttons with default props", async () => {
    const { queryByTestId } = render(
      <Routes>
        <Route
          path="/:resource/:action"
          element={
            <Create
              resource="posts"
              saveButtonProps={{ className: "customize-test" }}
              footerButtons={({ saveButtonProps }) => {
                expect(saveButtonProps).toBeDefined();

                return (
                  <>
                    <SaveButton {...saveButtonProps} />
                  </>
                );
              }}
            />
          }
        />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
        }),
      },
    );

    expect(queryByTestId(RefineButtonTestIds.SaveButton)).toHaveClass(
      "customize-test",
    );
  });
});
