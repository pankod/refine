import React, { type ReactNode } from "react";
import { crudListTests } from "@refinedev/ui-tests";
import { RefineButtonTestIds } from "@refinedev/ui-types";
import { Route, Routes } from "react-router";
import { CreateButton } from "@components/buttons";
import { render, TestWrapper } from "@test";
import { List } from "./index";

const renderList = (list: ReactNode) => {
  return render(
    <Routes>
      <Route path="/:resource" element={list} />
    </Routes>,
    {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts"],
      }),
    },
  );
};

describe("<List/>", () => {
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
