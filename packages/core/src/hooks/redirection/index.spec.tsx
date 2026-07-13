import { vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useRedirectionAfterSubmission } from "../redirection";

const goMock = vi.fn();

describe("redirectionAfterSubmission Hook", () => {
  beforeEach(() => {
    goMock.mockReset();
  });

  const { result } = renderHook(() => useRedirectionAfterSubmission(), {
    wrapper: TestWrapper({
      dataProvider: MockJSONServer,
      resources: [{ name: "posts", list: "/posts" }],
      routerProvider: mockRouterProvider({
        fns: {
          go: () => goMock,
        },
      }),
    }),
  });

  it("redirect list", async () => {
    result.current({
      redirect: "list",
      resource: { name: "posts", list: "/posts" },
      id: "1",
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts",
      type: "path",
      query: undefined,
    });
  });

  it("redirect false", async () => {
    result.current({
      redirect: false,
      resource: { name: "posts", list: "/posts" },
      id: "1",
    });

    expect(goMock).not.toHaveBeenCalled();
  });

  it("redirect show, canShow false", async () => {
    result.current({
      redirect: "show",
      resource: {
        name: "posts",
        list: "/posts",
      },
      id: "1",
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts",
      type: "path",
      query: undefined,
    });
  });

  it("redirect show, canShow true", async () => {
    result.current({
      redirect: "show",
      resource: {
        name: "posts",
        list: "/posts",
        show: "/posts/show/:id",
        meta: { canShow: true },
      },
      id: "1",
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts/show/1",
      type: "path",
      query: undefined,
    });
  });

  it("redirect edit, canEdit true", async () => {
    result.current({
      redirect: "edit",
      resource: {
        name: "posts",
        edit: "/posts/edit/:id",
        meta: { canEdit: true },
        list: "/posts",
      },
      id: "1",
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts/edit/1",
      type: "path",
      query: undefined,
    });
  });

  it("redirect edit, canEdit false", async () => {
    result.current({
      redirect: "edit",
      resource: {
        name: "posts",
        list: "/posts",
        meta: { canEdit: false },
      },
      id: "1",
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts",
      type: "path",
      query: undefined,
    });
  });

  it("redirect create, canCreate true", async () => {
    result.current({
      redirect: "create",
      resource: {
        name: "posts",
        create: "/posts/create",
        meta: { canCreate: true },
      },
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts/create",
      type: "path",
      query: undefined,
    });
  });

  it("redirect create, canCreate false", async () => {
    result.current({
      redirect: "create",
      resource: {
        name: "posts",
        list: "/posts",
        meta: { canCreate: false },
      },
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts",
      type: "path",
      query: undefined,
    });
  });

  it("redirect edit, canEdit true, id null", async () => {
    result.current({
      redirect: "edit",
      resource: {
        name: "posts",
        list: "/posts",
        meta: { canEdit: true },
      },
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts",
      type: "path",
      query: undefined,
    });
  });

  it("redirect show, canShow true, id null", async () => {
    result.current({
      redirect: "show",
      resource: {
        name: "posts",
        show: "/posts/show/:id",
        list: "/posts",
        meta: { canShow: true },
      },
    });

    expect(goMock).toHaveBeenCalledWith({
      to: "/posts",
      type: "path",
      query: undefined,
    });
  });
});
