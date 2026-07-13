import React from "react";
import { render, TestWrapper } from "@test";
import { PageHeader } from "./";
import { ConfigProvider } from "antd";

describe("PageHeader", () => {
  it("should render default back button with respect to direction from config", async () => {
    const { rerender, queryByLabelText } = render(
      <ConfigProvider>
        <PageHeader onBack={() => 0} title="title">
          content
        </PageHeader>
      </ConfigProvider>,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(queryByLabelText("arrow-left")).toBeTruthy();
    expect(queryByLabelText("arrow-right")).toBeFalsy();

    rerender(
      <ConfigProvider direction="rtl">
        <PageHeader onBack={() => 0} title="title">
          content
        </PageHeader>
      </ConfigProvider>,
    );

    expect(queryByLabelText("arrow-left")).toBeFalsy();
    expect(queryByLabelText("arrow-right")).toBeTruthy();
  });
});
