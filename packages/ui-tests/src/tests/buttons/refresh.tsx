import React from "react";
import { vi } from "vitest";
import {
  type RefineRefreshButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  act,
  fireEvent,
  render,
  TestWrapper,
  waitFor,
  mockRouterProvider,
} from "@test";
import { Route, Routes } from "react-router";
import "@refinedev/core";

const invalidateMock = vi.fn();
vi.mock("@refinedev/core", async () => ({
  ...(await vi.importActual("@refinedev/core")),
  useInvalidate: () => {
    return invalidateMock;
  },
}));

export const buttonRefreshTests = (
  RefreshButton: React.ComponentType<RefineRefreshButtonProps<any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Refresh Button", () => {
    const refresh = vi.fn();

    it("should render button successfuly", async () => {
      const { container } = render(<RefreshButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<RefreshButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.RefreshButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(
        <RefreshButton>refine</RefreshButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<RefreshButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Refresh")).not.toBeInTheDocument();
    });

    it("should render called function successfully if click the button", async () => {
      const { getByText } = render(
        <RefreshButton onClick={() => refresh()} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      await act(async () => {
        fireEvent.click(getByText("Refresh"));
      });

      expect(refresh).toHaveBeenCalledTimes(1);
    });

    /**
     * Previously `useInvalidate` was imported directly inside the UI packages,
     * which then can be mocked and tested through vitest.
     * Now we've switched to `useRefreshButton` from `@refinedev/core`
     * which calls `useInvalidate` internally.
     * We can't test the internal function calls of `useInvalidate` anymore.
     * Extensive tests on the logic of the `useRefreshButton` which powers the `RefreshButton` are already covered in the core package.
     */
    it.skip("should invalidates when button is clicked", async () => {
      vi.resetAllMocks();
      vi.restoreAllMocks();

      const { getByText } = render(
        <Routes>
          <Route
            path="/posts/show/:id"
            element={
              <RefreshButton dataProviderName="default" resource="posts" />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/posts/show/1"],
            resources: [
              {
                name: "posts",
                show: "/posts/show/:id",
              },
            ],
          }),
        },
      );

      const button = getByText("Refresh");

      await act(async () => {
        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(invalidateMock).toHaveBeenCalledTimes(1);
        expect(invalidateMock).toHaveBeenCalledWith({
          id: "1",
          invalidates: ["detail"],
          dataProviderName: "default",
          resource: "posts",
        });
      });
    });

    it("should when onClick is not passed, NOT invalidates when button is clicked", async () => {
      vi.resetAllMocks();
      vi.restoreAllMocks();

      const onClickMock = vi.fn();

      const { getByText } = render(
        <Routes>
          <Route
            path="/posts/show/:id"
            element={
              <RefreshButton
                onClick={onClickMock}
                dataProviderName="default"
                resource="posts"
              />
            }
          />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/posts/show/1"],
            resources: [
              {
                name: "posts",
                show: "/posts/show/:id",
              },
            ],
          }),
        },
      );

      const button = getByText("Refresh");

      await act(async () => {
        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(invalidateMock).toHaveBeenCalledTimes(0);
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
    });
  });
};
