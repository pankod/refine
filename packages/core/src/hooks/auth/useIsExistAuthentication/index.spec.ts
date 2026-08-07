import { TestWrapper } from "@test/index";
import { renderHook } from "@testing-library/react";
import { useIsExistAuthentication } from ".";

describe("useActiveAuthProvider", () => {
  it("authProvider", async () => {
    const { result } = renderHook(() => useIsExistAuthentication(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    expect(result.current).toBeTruthy();
  });

  it("returns false", async () => {
    const { result } = renderHook(() => useIsExistAuthentication(), {
      wrapper: TestWrapper({}),
    });

    expect(result.current).toBe(false);
  });
});
