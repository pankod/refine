import React from "react";
import { buttonRefreshTests } from "@refinedev/ui-tests";
import { render, TestWrapper } from "@test";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { RefreshButton } from "./";

describe("Refresh Button", () => {
  buttonRefreshTests.bind(this)(RefreshButton);

  describe("custom startIcon with hideText", () => {
    it("should render only the custom startIcon when hideText is true", () => {
      const { container, queryByTestId } = render(
        <RefreshButton
          hideText
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
      const { container } = render(<RefreshButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container.querySelectorAll("svg")).toHaveLength(1);
    });

    it("should use custom startIcon instead of default when hideText is false", () => {
      const { queryByTestId, getByText } = render(
        <RefreshButton
          startIcon={<InsertDriveFileIcon data-testid="custom-icon" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByTestId("custom-icon")).toBeInTheDocument();
      expect(getByText("Refresh")).toBeInTheDocument();
    });

    it("should render default icon in startIcon slot with label when hideText is false and no startIcon provided", () => {
      const { container, getByText } = render(<RefreshButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container.querySelectorAll("svg")).toHaveLength(1);
      expect(
        container.querySelector("svg")?.closest(".MuiButton-startIcon"),
      ).toBeTruthy();
      expect(getByText("Refresh")).toBeInTheDocument();
    });
  });
});
