import React from "react";
import { buttonShowTests } from "@refinedev/ui-tests";
import { render, TestWrapper } from "@test";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ShowButton } from "./";

describe("Show Button", () => {
  buttonShowTests.bind(this)(ShowButton);

  describe("custom startIcon with hideText", () => {
    it("should render only the custom startIcon when hideText is true", () => {
      const { container, queryByTestId } = render(
        <ShowButton
          hideText
          startIcon={<InsertDriveFileIcon data-testid="custom-icon" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();
      // Custom icon should be present
      expect(queryByTestId("custom-icon")).toBeInTheDocument();
      // Default VisibilityOutlined icon should NOT be present
      expect(container.querySelectorAll("svg")).toHaveLength(1);
    });

    it("should render default icon when hideText is true and no startIcon provided", () => {
      const { container } = render(<ShowButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
      // Should have exactly one icon (the default VisibilityOutlined)
      expect(container.querySelectorAll("svg")).toHaveLength(1);
    });

    it("should use custom startIcon instead of default when hideText is false", () => {
      const { container, queryByTestId, getByText } = render(
        <ShowButton
          startIcon={<InsertDriveFileIcon data-testid="custom-icon" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();
      expect(queryByTestId("custom-icon")).toBeInTheDocument();
      expect(getByText("Show")).toBeInTheDocument();
    });

    it("should render default icon in startIcon slot with label when hideText is false and no startIcon provided", () => {
      const { container, getByText } = render(<ShowButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container.querySelectorAll("svg")).toHaveLength(1);
      expect(
        container.querySelector("svg")?.closest(".MuiButton-startIcon"),
      ).toBeTruthy();
      expect(getByText("Show")).toBeInTheDocument();
    });
  });
});
