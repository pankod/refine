import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { useButtonCanAccess } from ".";

const actions = ["list", "show", "create", "edit", "clone", "delete"] as const;

describe("useButtonCanAccess", () => {
  describe.each(actions)("with action %s", (action) => {
    it("should allow if no access provider is defined", () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({ action, resource: { name: "posts" }, id: 123 }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      expect(result.current).toEqual(
        expect.objectContaining({
          title: "",
          hidden: false,
          disabled: false,
          canAccess: expect.objectContaining({ can: true }),
        }),
      );
    });

    it("should allow if access provider is disabled by props", () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
            accessControl: {
              enabled: false,
            },
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      expect(result.current).toEqual(
        expect.objectContaining({
          title: "",
          hidden: false,
          disabled: false,
          canAccess: expect.objectContaining({ can: true }),
        }),
      );
    });

    it("should disable if access provider returns can false", async () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            accessControlProvider: {
              // options: {
              //   buttons: {
              //     enableAccessControl: true,
              //   },
              // },
              can: async () => {
                return {
                  can: false,
                };
              },
            },
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            title: "You don't have permission to access",
            hidden: false,
            disabled: true,
            canAccess: expect.objectContaining({ can: false }),
          }),
        );
      });
    });

    it("should return title by reason if access provider returns reason", async () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            accessControlProvider: {
              can: async () => {
                return {
                  can: false,
                  reason: "You are not allowed to access",
                };
              },
            },
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            title: "You are not allowed to access",
            hidden: false,
            disabled: true,
            canAccess: expect.objectContaining({ can: false }),
          }),
        );
      });
    });

    it("should hide if access provider returns can false and hideIfUnauthorized is true (global)", async () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            accessControlProvider: {
              options: {
                buttons: {
                  hideIfUnauthorized: true,
                },
              },
              can: async () => {
                return {
                  can: false,
                };
              },
            },
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            title: "You don't have permission to access",
            hidden: true,
            disabled: true,
            canAccess: expect.objectContaining({ can: false }),
          }),
        );
      });
    });

    it("should hide if access provider returns can false and hideIfUnauthorized is true (by props)", async () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
            accessControl: {
              hideIfUnauthorized: true,
            },
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            accessControlProvider: {
              can: async () => {
                return {
                  can: false,
                };
              },
            },
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            title: "You don't have permission to access",
            hidden: true,
            disabled: true,
            canAccess: expect.objectContaining({ can: false }),
          }),
        );
      });
    });

    it("should use i18n to return title", async () => {
      const { result } = renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            i18nProvider: {
              translate: (key: string) => {
                if (key === "buttons.notAccessTitle") {
                  return "You don't have permission to access (i18n)";
                }
                return key;
              },
              changeLocale: () => Promise.resolve(),
              getLocale: () => "en",
            },
            accessControlProvider: {
              can: async () => {
                return {
                  can: false,
                };
              },
            },
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            title: "You don't have permission to access (i18n)",
            hidden: false,
            disabled: true,
            canAccess: expect.objectContaining({ can: false }),
          }),
        );
      });
    });
  });
});
