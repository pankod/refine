import { vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

// Mock useCan hook for meta prop testing
vi.mock("../../accessControl/useCan", () => ({
  useCan: vi.fn(),
}));

import { useButtonCanAccess } from ".";
import { useCan } from "../../accessControl/useCan";

const mockUseCan = useCan as vi.MockedFunction<typeof useCan>;

const actions = ["list", "show", "create", "edit", "clone", "delete"] as const;

describe("useButtonCanAccess - meta prop passing to useCan", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock return value
    mockUseCan.mockReturnValue({
      data: { can: true },
      isLoading: false,
      isError: false,
      error: null,
    } as any);
  });

  it("should pass meta prop to useCan", () => {
    const testMeta = {
      userRole: "admin",
      department: "finance",
      permissions: ["read", "write", "delete"],
    };

    renderHook(
      () =>
        useButtonCanAccess({
          action: "edit",
          resource: { name: "posts" },
          id: 456,
          meta: testMeta,
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

    expect(mockUseCan).toHaveBeenCalledWith({
      resource: "posts",
      action: "edit",
      params: {
        meta: testMeta,
        id: 456,
        resource: { name: "posts" },
      },
      queryOptions: {
        enabled: true,
      },
    });
  });

  it("should pass undefined meta when meta prop is not provided", () => {
    renderHook(
      () =>
        useButtonCanAccess({
          action: "show",
          resource: { name: "users" },
          id: 789,
        }),
      {
        wrapper: TestWrapper({
          resources: [{ name: "users" }],
          routerProvider: mockRouterProvider({
            resource: { name: "users" },
          }),
        }),
      },
    );

    expect(mockUseCan).toHaveBeenCalledWith({
      resource: "users",
      action: "show",
      params: {
        meta: undefined,
        id: 789,
        resource: { name: "users" },
      },
      queryOptions: {
        enabled: true,
      },
    });
  });

  it("should pass meta prop with access control disabled", () => {
    const testMeta = {
      customField: "test-value",
      organizationId: 999,
    };

    renderHook(
      () =>
        useButtonCanAccess({
          action: "create",
          resource: { name: "articles" },
          meta: testMeta,
          accessControl: {
            enabled: false,
          },
        }),
      {
        wrapper: TestWrapper({
          resources: [{ name: "articles" }],
          routerProvider: mockRouterProvider({
            resource: { name: "articles" },
          }),
        }),
      },
    );

    expect(mockUseCan).toHaveBeenCalledWith({
      resource: "articles",
      action: "create",
      params: {
        meta: testMeta,
        id: undefined,
        resource: { name: "articles" },
      },
      queryOptions: {
        enabled: false,
      },
    });
  });

  it("should handle clone action correctly (converts to create)", () => {
    const testMeta = {
      cloneSource: "original-post",
      templateId: 42,
    };

    renderHook(
      () =>
        useButtonCanAccess({
          action: "clone",
          resource: { name: "posts" },
          id: 123,
          meta: testMeta,
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

    expect(mockUseCan).toHaveBeenCalledWith({
      resource: "posts",
      action: "create", // clone action should be converted to create
      params: {
        meta: testMeta,
        id: 123,
        resource: { name: "posts" },
      },
      queryOptions: {
        enabled: true,
      },
    });
  });

  it("should pass meta prop for all different actions", () => {
    const testMeta = {
      testCase: "all-actions",
      timestamp: Date.now(),
    };

    actions.forEach((action) => {
      vi.clearAllMocks();

      renderHook(
        () =>
          useButtonCanAccess({
            action,
            resource: { name: "posts" },
            id: 123,
            meta: testMeta,
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

      expect(mockUseCan).toHaveBeenCalledWith({
        resource: "posts",
        action: action === "clone" ? "create" : action,
        params: {
          meta: testMeta,
          id: 123,
          resource: { name: "posts" },
        },
        queryOptions: {
          enabled: true,
        },
      });
    });
  });

  it("should pass complex meta object with nested properties", () => {
    const complexMeta = {
      filters: {
        status: "published",
        category: ["tech", "programming"],
      },
      pagination: {
        page: 1,
        limit: 10,
      },
      user: {
        id: 42,
        role: "editor",
        permissions: {
          canEdit: true,
          canDelete: false,
        },
      },
    };

    renderHook(
      () =>
        useButtonCanAccess({
          action: "delete",
          resource: { name: "posts" },
          id: 123,
          meta: complexMeta,
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

    expect(mockUseCan).toHaveBeenCalledWith({
      resource: "posts",
      action: "delete",
      params: {
        meta: complexMeta,
        id: 123,
        resource: { name: "posts" },
      },
      queryOptions: {
        enabled: true,
      },
    });
  });
});
