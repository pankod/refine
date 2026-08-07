import { vi } from "vitest";
import React from "react";
import type { RefineErrorPageProps } from "@refinedev/ui-types";

import {
  fireEvent,
  mockRouterProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";

export const pageErrorTests = (
  ErrorPage: React.ComponentType<RefineErrorPageProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Error Page", () => {
    it("should render successfully", async () => {
      const { container } = render(<ErrorPage />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });

    it("back home button should work with router provider", async () => {
      const goMock = vi.fn();

      const { getByText } = render(<ErrorPage />, {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            fns: {
              go: () => goMock,
            },
          }),
        }),
      });

      fireEvent.click(getByText("Back Home"));

      await waitFor(() => {
        expect(goMock).toHaveBeenCalledTimes(1);
      });

      expect(goMock).toHaveBeenCalledWith({ to: "/" });
    });
  });
};
