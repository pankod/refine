import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import { TestWrapper } from "@test";

import { useDrawer } from ".";

const Wrapper = TestWrapper({});

describe("useDrawer Hook", () => {
  it("should not be visible on init", async () => {
    const { result } = renderHook(() => useDrawer(), {
      wrapper: Wrapper,
    });

    const { drawerProps } = result.current;

    expect(drawerProps.open).toEqual(false);
  });

  it("should be visible when passed open astrue with prop", async () => {
    const { result } = renderHook(
      () =>
        useDrawer({
          drawerProps: {
            open: true,
          },
        }),
      {
        wrapper: Wrapper,
      },
    );

    const { drawerProps } = result.current;

    expect(drawerProps.open).toEqual(true);
  });

  it("should be visible after on calling show", async () => {
    const { result } = renderHook(() => useDrawer(), {
      wrapper: Wrapper,
    });

    const { show } = result.current;

    act(() => {
      show();
    });

    expect(result.current.drawerProps.open).toEqual(true);
  });

  it("should not be visible after calling close", async () => {
    const { result } = renderHook(() => useDrawer(), {
      wrapper: Wrapper,
    });

    const { show, close } = result.current;

    act(() => {
      show();
    });

    expect(result.current.drawerProps.open).toEqual(true);

    act(() => {
      close();
    });

    expect(result.current.drawerProps.open).toEqual(false);
  });

  it("should call close on drawer onClose", async () => {
    const mockedOnClose = vi.fn();
    const { result } = renderHook(
      () =>
        useDrawer({
          drawerProps: {
            onClose: mockedOnClose,
          },
        }),
      {
        wrapper: Wrapper,
      },
    );

    const { show, drawerProps } = result.current;

    act(() => {
      show();
    });

    expect(result.current.drawerProps.open).toEqual(true);

    act(() => {
      drawerProps.onClose?.(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }) as any,
      );
    });

    expect(result.current.drawerProps.open).toEqual(false);
    expect(mockedOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call close when drawerProps onClose is undefined", async () => {
    const { result } = renderHook(() => useDrawer(), {
      wrapper: Wrapper,
    });

    const { show, drawerProps } = result.current;

    act(() => {
      show();
    });

    expect(result.current.drawerProps.open).toEqual(true);

    act(() => {
      drawerProps.onClose?.(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }) as any,
      );
    });

    expect(result.current.drawerProps.open).toEqual(false);
  });
});
