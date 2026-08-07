import { vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useNavigation } from ".";

const goMock = vi.fn();
const backMock = vi.fn();

const routerProvider = mockRouterProvider({
  fns: {
    go: () => {
      return ({ to, type, ...rest }) => {
        if (type === "path") return to;
        goMock({ to, type, ...rest });
        return undefined;
      };
    },
    back: () => backMock,
  },
});

describe("useNavigation Hook [new]", () => {
  beforeEach(() => {
    goMock.mockReset();
    backMock.mockReset();
  });

  describe("navigation methods with resource actions", () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        routerProvider,
        resources: [
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            clone: "/posts/create/:id",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
          },
        ],
      }),
    });

    it("navigate to show page with push", async () => {
      result.current.show("posts", "1", "push");

      expect(goMock).toHaveBeenCalledWith({
        to: "/posts/show/1",
        type: "push",
      });
    });

    it("navigate to create page with push", async () => {
      result.current.create("posts", "push");

      expect(goMock).toHaveBeenCalledWith({
        to: "/posts/create",
        type: "push",
      });
    });

    it("navigate to edit page with push", async () => {
      result.current.edit("posts", "1", "push");

      expect(goMock).toHaveBeenCalledWith({
        to: "/posts/edit/1",
        type: "push",
      });
    });

    it("navigate to clone page with push", async () => {
      result.current.clone("posts", "1", "push");

      expect(goMock).toHaveBeenCalledWith({
        to: "/posts/create/1",
        type: "push",
      });
    });

    it("navigate to list page with push", async () => {
      result.current.list("posts", "push");

      expect(goMock).toHaveBeenCalledWith({ to: "/posts", type: "push" });
    });
    it("by default navigation methods should use push", async () => {
      result.current.show("posts", "1");
      result.current.create("posts");
      result.current.edit("posts", "1");
      result.current.clone("posts", "1");
      result.current.list("posts");

      expect(goMock).toHaveBeenCalledTimes(5);
      expect(goMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: "push" }),
      );
    });
  });

  describe("navigation methods without resource actions", () => {
    it("if resource has no actions, it pass empty string to go method", async () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          routerProvider,
          resources: [{ name: "users" }],
        }),
      });

      result.current.show("posts", "1", "push");
      expect(goMock).toHaveBeenCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.create("posts", "push");
      expect(goMock).toHaveBeenCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.edit("posts", "1", "push");
      expect(goMock).toHaveBeenCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.clone("posts", "1", "push");
      expect(goMock).toHaveBeenCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.list("posts", "push");
      expect(goMock).toHaveBeenCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();
    });
  });

  it("should return correct path for a passed resource", async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        routerProvider,
        resources: [{ name: "posts" }],
      }),
    });

    const createPath = result.current.createUrl({
      name: "posts",
      create: "/posts/create",
    });
    expect(createPath).toBe("/posts/create");

    const listPath = result.current.listUrl({
      name: "posts",
      list: "/posts",
    });
    expect(listPath).toBe("/posts");

    const editPath = result.current.editUrl(
      { name: "posts", edit: "/posts/edit/:id" },
      "1",
    );
    expect(editPath).toBe("/posts/edit/1");

    const showPath = result.current.showUrl(
      { name: "posts", show: "/posts/show/:id" },
      "1",
    );
    expect(showPath).toBe("/posts/show/1");

    const clonePath = result.current.cloneUrl(
      { name: "posts", clone: "/posts/create/:id" },
      "1",
    );
    expect(clonePath).toBe("/posts/create/1");
  });
});
