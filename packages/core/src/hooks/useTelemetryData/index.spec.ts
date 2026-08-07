import { renderHook } from "@testing-library/react";

import { defaultRefineOptions } from "@contexts/refine";
import { MockJSONServer, TestWrapper } from "@test";

import { useTelemetryData } from ".";
import type { IRefineContextProvider } from "../../contexts/refine/types";

describe("useTelemetryData Hook", () => {
  describe("authProvider", () => {
    it("must be false", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      });

      const { providers } = result.current;
      expect(providers.auth).toBeFalsy();
    });

    it("authProvider must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: false }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.auth).toBeTruthy();
    });
  });

  describe("auditLogProvider", () => {
    it("must be false", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      });

      const { providers } = result.current;
      expect(providers.auditLog).toBeFalsy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          auditLogProvider: {
            create: () => Promise.resolve(),
            get: () => Promise.resolve(),
            update: () => Promise.resolve(),
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.auditLog).toBeTruthy();
    });
  });

  describe("liveProvider", () => {
    it("must be false", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      });

      const { providers } = result.current;
      expect(providers.live).toBeFalsy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          liveProvider: {
            subscribe: () => {
              return;
            },
            unsubscribe: () => {
              return;
            },
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.live).toBeTruthy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          liveProvider: {
            subscribe: undefined as any,
            unsubscribe: () => {
              return;
            },
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.live).toBeTruthy();
    });
  });

  describe("i18nProvider", () => {
    it("must be false", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
        }),
      });

      const { providers } = result.current;
      expect(providers.i18n).toBeFalsy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          i18nProvider: {
            translate: () => {
              return "";
            },
            changeLocale: () => {
              return Promise.resolve();
            },

            getLocale: () => {
              return "";
            },
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.i18n).toBeTruthy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          i18nProvider: {
            changeLocale: undefined as any,
            translate: () => {
              return "";
            },
            getLocale: () => {
              return "";
            },
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.i18n).toBeTruthy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          i18nProvider: {
            translate: () => {
              return "";
            },
            changeLocale: undefined as any,
            getLocale: undefined as any,
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.i18n).toBeTruthy();
    });
  });

  describe("notificationProvider", () => {
    it("must be false", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
        }),
      });

      const { providers } = result.current;
      expect(providers.notification).toBeFalsy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          notificationProvider: {
            close: () => Promise.resolve(),
            open: () => Promise.resolve(),
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.notification).toBeTruthy();
    });
  });

  describe("accessControlProvider", () => {
    it("must be false", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
        }),
      });

      const { providers } = result.current;
      expect(providers.accessControl).toBeFalsy();
    });

    it("must be true", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          accessControlProvider: {
            can: async () => {
              return Promise.resolve({ can: true });
            },
          },
        }),
      });

      const { providers } = result.current;
      expect(providers.accessControl).toBeTruthy();
    });
  });

  describe("projectId", () => {
    const mockRefineProvider: IRefineContextProvider = {
      ...defaultRefineOptions,
      options: defaultRefineOptions,
    };

    it("must be undefined", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
        }),
      });

      const { projectId } = result.current;
      expect(projectId).toBeUndefined();
    });

    it("must be defined", async () => {
      const { result } = renderHook(() => useTelemetryData(), {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          refineProvider: {
            ...mockRefineProvider,
            options: {
              ...mockRefineProvider.options,
              projectId: "test",
            },
          },
        }),
      });

      const { projectId } = result.current;
      expect(projectId).toBe("test");
    });
  });
});
