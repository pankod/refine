import React from "react";
import { buttonDeleteTests } from "@refinedev/ui-tests";
import { render, TestWrapper } from "@test";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { DeleteButton } from "./";

describe("Delete Button", () => {
  buttonDeleteTests.bind(this)(DeleteButton);

  describe("custom startIcon with hideText", () => {
    it("should render only the custom startIcon when hideText is true", () => {
      const { container, queryByTestId } = render(
        <DeleteButton
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
      const { container } = render(<DeleteButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container.querySelectorAll("svg")).toHaveLength(1);
    });

    it("should use custom startIcon instead of default when hideText is false", () => {
      const { queryByTestId, getByText } = render(
        <DeleteButton
          startIcon={<InsertDriveFileIcon data-testid="custom-icon" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByTestId("custom-icon")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });

    it("should render default icon in startIcon slot with label when hideText is false and no startIcon provided", () => {
      const { container, getByText } = render(<DeleteButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container.querySelectorAll("svg")).toHaveLength(1);
      expect(
        container.querySelector("svg")?.closest(".MuiButton-startIcon"),
      ).toBeTruthy();
      expect(getByText("Delete")).toBeInTheDocument();
    });
  });
});
