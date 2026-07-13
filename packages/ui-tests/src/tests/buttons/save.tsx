import { vi } from "vitest";
import React from "react";
import {
  type RefineSaveButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper } from "@test";

export const buttonSaveTests = (
  SaveButton: React.ComponentType<RefineSaveButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Save Button", () => {
    const save = vi.fn();

    it("should render button successfuly", async () => {
      const { container } = render(<SaveButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<SaveButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.SaveButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(<SaveButton>refine</SaveButton>, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<SaveButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Save")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(<SaveButton onClick={() => save()} />, {
        wrapper: TestWrapper({}),
      });

      await act(async () => {
        fireEvent.click(getByText("Save"));
      });

      expect(save).toHaveBeenCalledTimes(1);
    });
  });
};
