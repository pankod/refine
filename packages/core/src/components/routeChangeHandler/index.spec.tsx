import React from "react";
import { vi } from "vitest";
import { render, TestWrapper, act, mockAuthProvider } from "@test";

import { RouteChangeHandler } from "./index";

describe("routeChangeHandler", () => {
  it("should render successful", () => {
    const { container } = render(<RouteChangeHandler />, {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    expect(container.innerHTML).toHaveLength(0);
  });

  it("should call check on route change", async () => {
    const checkAuthMockedAuthProvider = {
      ...mockAuthProvider,
      check: vi.fn().mockImplementation(() => Promise.resolve()),
    };

    await act(async () => {
      render(<RouteChangeHandler />, {
        wrapper: TestWrapper({
          authProvider: checkAuthMockedAuthProvider,
        }),
      });
    });

    expect(checkAuthMockedAuthProvider.check).toHaveBeenCalledTimes(1);
  });

  it("should ignore check Promise.reject", async () => {
    const checkAuthMockedAuthProvider = {
      ...mockAuthProvider,
      check: vi.fn().mockImplementation(() => Promise.reject()),
    };

    await act(async () => {
      render(<RouteChangeHandler />, {
        wrapper: TestWrapper({
          authProvider: checkAuthMockedAuthProvider,
        }),
      });
    });

    expect(checkAuthMockedAuthProvider.check).toHaveBeenCalledTimes(1);
  });
});
