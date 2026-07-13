import React, { type ReactNode } from "react";
import { crudListTests } from "@refinedev/ui-tests";
import { RefineButtonTestIds } from "@refinedev/ui-types";
import { Route, Routes } from "react-router";
import { CreateButton } from "@components/buttons";
import { MockRouterProvider, render, TestWrapper } from "@test";
import { List } from "./index";
import { vi } from "vitest";

const renderList = (list: ReactNode) => {
  return render(
    <Routes>
      <Route path="/:resource" element={list} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts"],
        routerProvider: MockRouterProvider(),
      }),
    },
  );
};

describe("<List/>", () => {
  beforeEach(() => {
    // This is an issue on `mantine` side rather than `refine`. Ignoring for now but might need to be fixed.
    vi.spyOn(console, "error").mockImplementation((message) => {
      if (message?.includes?.("validateDOMNesting")) {
        return;
      }

      console.warn(message);
    });
  });

  crudListTests.bind(this)(List);

  it("should customize default buttons with default props", async () => {
    const { queryByTestId } = renderList(
      <List
        createButtonProps={{ className: "customize-test" }}
        headerButtons={({ createButtonProps }) => {
          expect(createButtonProps).toBeDefined();

          return (
            <>
              <CreateButton {...createButtonProps} />
            </>
          );
        }}
      />,
    );

    expect(queryByTestId(RefineButtonTestIds.CreateButton)).toHaveClass(
      "customize-test",
    );
  });
});
