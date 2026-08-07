import React from "react";
import { vi } from "vitest";
import {
  type RefineImportButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, render, TestWrapper } from "@test";

export const buttonImportTests = (
  ImportButton: React.ComponentType<RefineImportButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Import Button", () => {
    const parseMock = vi.fn();

    beforeAll(() => {
      vi.mock("papaparse", async () => {
        return {
          parse: vi.fn(() => parseMock()),
        };
      });
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<ImportButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
      getByText("Import");
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<ImportButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.ImportButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(
        <ImportButton>refine</ImportButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<ImportButton hideText />);

      expect(container).toBeTruthy();
      expect(queryByText("Import")).not.toBeInTheDocument();
    });
  });
};
