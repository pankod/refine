import React from "react";
import { vi } from "vitest";
import { render } from "@testing-library/react";
import type { IResourceItem } from "@refinedev/core";

import { NavigateToResource } from "./navigate-to-resource";

const mockNavigate = vi.fn();

vi.mock("@remix-run/react", () => ({
  useNavigate: () => mockNavigate,
}));

const mockUseResourceParams = vi.fn();
const mockUseGetToPath = vi.fn();

vi.mock("@refinedev/core", async () => {
  const actual = await vi.importActual("@refinedev/core");
  return {
    ...actual,
    useResourceParams: (props: { resource?: string }) =>
      mockUseResourceParams(props),
    useGetToPath: () => mockUseGetToPath,
  };
});

describe("NavigateToResource", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseResourceParams.mockClear();
    mockUseGetToPath.mockClear();
  });

  it("should navigate to the first resource with list action", async () => {
    const resources: IResourceItem[] = [
      { name: "posts", list: "/posts" },
      { name: "categories", list: "/categories" },
    ];

    mockUseResourceParams.mockReturnValue({
      resource: resources[0],
      resources,
    });

    mockUseGetToPath.mockReturnValue("/posts");

    const { rerender } = render(<NavigateToResource />);

    expect(mockNavigate).toHaveBeenCalledWith("/posts", { replace: true });
    expect(mockNavigate).toHaveBeenCalledTimes(1);

    // Should not navigate again on rerender
    rerender(<NavigateToResource />);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should navigate to the specified resource", async () => {
    const resources: IResourceItem[] = [
      { name: "posts", list: "/posts" },
      { name: "categories", list: "/categories" },
    ];

    mockUseResourceParams.mockReturnValue({
      resource: resources[1],
      resources,
    });

    mockUseGetToPath.mockReturnValue("/categories");

    render(<NavigateToResource resource="categories" />);

    expect(mockNavigate).toHaveBeenCalledWith("/categories", { replace: true });
  });

  it("should navigate to fallbackTo when no resource is found", async () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    mockUseResourceParams.mockReturnValue({
      resource: undefined,
      resources: [],
    });

    render(<NavigateToResource fallbackTo="/dashboard" />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "No resource is found. navigation to /dashboard.",
    );
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });

    consoleWarnSpy.mockRestore();
  });

  it("should not navigate when no resource and no fallbackTo is provided", async () => {
    mockUseResourceParams.mockReturnValue({
      resource: undefined,
      resources: [],
    });

    render(<NavigateToResource />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should not navigate when getToPath returns undefined", async () => {
    const resources: IResourceItem[] = [{ name: "posts" }];

    mockUseResourceParams.mockReturnValue({
      resource: resources[0],
      resources,
    });

    mockUseGetToPath.mockReturnValue(undefined);

    render(<NavigateToResource resource="posts" />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should only navigate once using ref", async () => {
    const resources: IResourceItem[] = [{ name: "posts", list: "/posts" }];

    mockUseResourceParams.mockReturnValue({
      resource: resources[0],
      resources,
    });

    mockUseGetToPath.mockReturnValue("/posts");

    const { rerender } = render(<NavigateToResource />);

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    // Force effect to run again
    rerender(<NavigateToResource />);

    // Should still only be called once
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
