import { renderHook } from "@testing-library/react";
import React from "react";

import { useMemoized } from ".";

describe("useMemoized Hook", () => {
  it("should return true for empty arrays", () => {
    const dependencies: React.DependencyList = [];
    const { result } = renderHook(() => useMemoized(dependencies));
    expect(result.current).toBe(dependencies);
  });

  it("should return true for deep equal arrays", () => {
    const dependencies: React.DependencyList = [1, 2, 3];
    const { result } = renderHook(() => useMemoized(dependencies));
    expect(result.current).toBe(dependencies);
  });

  it("should return same instance when send with different instance", () => {
    const dependencies: React.DependencyList = [1, 2, 3];
    const { result, ...rest } = renderHook((deps) => useMemoized(deps), {
      initialProps: dependencies,
    });

    rest.rerender([...dependencies]);

    expect(result.current).toBe(dependencies);
  });

  it("should return the new instance when new dependencies sent", () => {
    const dependencies: React.DependencyList = [1, 2, 3];
    const { result, ...rest } = renderHook((deps) => useMemoized(deps), {
      initialProps: dependencies,
    });

    const newDependencies: React.DependencyList = [4, 5, 6];

    rest.rerender(newDependencies);

    expect(result.current).toBe(newDependencies);
  });

  it("should return the same instance for react node instances", () => {
    const node = <div>hello</div>;

    const { result, ...rest } = renderHook((deps) => useMemoized(deps), {
      initialProps: node,
    });

    const newNode = <div>hello</div>;

    rest.rerender(newNode);

    expect(result.current).toBe(node);
  });

  it("should return same instance when re-initialized object array (fake resources)", () => {
    const show = () => null;

    const first = [
      {
        name: "posts",
        icon: <div>POSTS</div>,
        show: show,
      },
      {
        name: "categories",
        icon: <div>CATEGORIES</div>,
        show: show,
      },
    ];

    const { result, ...rest } = renderHook((deps) => useMemoized(deps), {
      initialProps: first,
    });

    const second = [
      {
        name: "posts",
        icon: <div>POSTS</div>,
        show: show,
      },
      {
        name: "categories",
        icon: <div>CATEGORIES</div>,
        show: show,
      },
    ];

    rest.rerender(second);

    expect(result.current).toBe(first);
    expect(result.current).not.toBe(second);
  });

  it("should return next instance when re-initialized object array with changes (fake resources)", () => {
    const show = () => null;

    const first = [
      {
        name: "posts",
        icon: <div>POSTS</div>,
        show: show,
      },
      {
        name: "categories",
        icon: <div>CATEGORIES</div>,
        show: show,
      },
    ];

    const { result, ...rest } = renderHook((deps) => useMemoized(deps), {
      initialProps: first,
    });

    const second = [
      {
        name: "posts",
        icon: <div>POSTS NEW</div>,
        show: show,
      },
      {
        name: "categories",
        icon: <div>CATEGORIES</div>,
        show: show,
      },
    ];

    rest.rerender(second);

    expect(result.current).toBe(second);
    expect(result.current).not.toBe(first);
  });
});
