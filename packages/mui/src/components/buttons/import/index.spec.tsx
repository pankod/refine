import React from "react";
import { buttonImportTests } from "@refinedev/ui-tests";
import { render, TestWrapper } from "@test";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ImportButton } from "./";

describe("ImportButton", () => {
  buttonImportTests.bind(this)(ImportButton);

  describe("custom startIcon with hideText", () => {
    it("should render only the custom startIcon when hideText is true", () => {
      const { container, queryByTestId } = render(
        <ImportButton
          hideText
          inputProps={{ type: "file" }}
          startIcon={<InsertDriveFileIcon data-testid="custom-icon" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByTestId("custom-icon")).toBeInTheDocument();
      expect(container.querySelectorAll("svg")).toHaveLength(1);
    });

    it("should render default icon when hideText is true and no startIcon provided", () => {
      const { container } = render(
        <ImportButton hideText inputProps={{ type: "file" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container.querySelectorAll("svg")).toHaveLength(1);
    });

    it("should use custom startIcon instead of default when hideText is false", () => {
      const { queryByTestId, getByText } = render(
        <ImportButton
          inputProps={{ type: "file" }}
          startIcon={<InsertDriveFileIcon data-testid="custom-icon" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByTestId("custom-icon")).toBeInTheDocument();
      expect(getByText("Import")).toBeInTheDocument();
    });

    it("should render default icon in startIcon slot with label when hideText is false and no startIcon provided", () => {
      const { container, getByText } = render(
        <ImportButton inputProps={{ type: "file" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container.querySelectorAll("svg")).toHaveLength(1);
      expect(
        container.querySelector("svg")?.closest(".MuiButton-startIcon"),
      ).toBeTruthy();
      expect(getByText("Import")).toBeInTheDocument();
    });
  });
});
