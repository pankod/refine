import { vi } from "vitest";
import { generateDefaultDocumentTitle } from ".";
import * as UseRefineContext from "../../../hooks/refine/useRefineContext";
import { defaultRefineOptions } from "@contexts/refine";

const translateMock = vi.fn(
  (key: string, options?: any, defaultMessage?: string | undefined) => {
    return defaultMessage ?? options;
  },
);

describe("generateDocumentTitle", () => {
  vi.spyOn(UseRefineContext, "useRefineContext").mockReturnValue({
    options: defaultRefineOptions,
  } as any);

  beforeEach(() => {
    translateMock.mockClear();
  });

  it("should return the default title when resource is undefined", () => {
    expect(generateDefaultDocumentTitle(translateMock)).toBe("Refine");
  });

  it("should return `resource name` when action is `list`", () => {
    expect(
      generateDefaultDocumentTitle(translateMock, { name: "posts" }, "list"),
    ).toBe("Posts | Refine");
  });

  it("should return the label of the resource when it is provided", () => {
    expect(
      generateDefaultDocumentTitle(
        translateMock,
        { name: "posts", meta: { label: "Posts Label" } },
        "list",
      ),
    ).toBe("Posts Label | Refine");
  });

  it("should return `Create new resource name` when action is `create`", () => {
    expect(
      generateDefaultDocumentTitle(translateMock, { name: "posts" }, "create"),
    ).toBe("Create new Post | Refine");
  });

  it("should return `#id Clone resource name` when action is `clone`", () => {
    expect(
      generateDefaultDocumentTitle(
        translateMock,
        { name: "posts" },
        "clone",
        "1",
      ),
    ).toBe("#1 Clone Post | Refine");
  });

  it("should return `#id Edit resource name` when action is `edit`", () => {
    expect(
      generateDefaultDocumentTitle(
        translateMock,
        { name: "posts" },
        "edit",
        "1",
      ),
    ).toBe("#1 Edit Post | Refine");
  });

  it("should return `#id Show resource name` when action is `show`", () => {
    expect(
      generateDefaultDocumentTitle(
        translateMock,
        { name: "posts" },
        "show",
        "1",
      ),
    ).toBe("#1 Show Post | Refine");
  });

  it("should pass `id` to `translate` function", () => {
    generateDefaultDocumentTitle(translateMock, { name: "posts" }, "show", "1");

    expect(translateMock).toHaveBeenCalledWith(
      "documentTitle.posts.show",
      { id: "1" },
      "#1 Show Post | Refine",
    );
  });

  it("should use the fallback value when `translate` returns the key", () => {
    translateMock.mockReturnValueOnce("documentTitle.posts.show");
    expect(
      generateDefaultDocumentTitle(
        translateMock,
        { name: "posts" },
        "show",
        "1",
      ),
    ).toBe("#1 Show Post | Refine");
  });
});
