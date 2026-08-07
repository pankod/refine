import { renderHook } from "@testing-library/react";
import { act } from "react";

import { TestWrapper } from "@test";

import { useModal } from ".";

const Wrapper = TestWrapper({});

describe("useModal Hook", () => {
  it("should visible false on init", async () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: Wrapper,
    });

    const { visible } = result.current;

    expect(visible).toEqual(false);
  });

  it("should visible true on pass visible true with prop", async () => {
    const { result } = renderHook(
      () =>
        useModal({
          defaultVisible: true,
        }),
      {
        wrapper: Wrapper,
      },
    );

    const { visible } = result.current;

    expect(visible).toEqual(true);
  });

  it("should visible true on called show", async () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: Wrapper,
    });

    const { show } = result.current;

    act(() => {
      show();
    });

    expect(result.current.visible).toEqual(true);
  });

  it("should visible false on called show after close", async () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: Wrapper,
    });

    const { show, close } = result.current;

    act(() => {
      show();
    });

    expect(result.current.visible).toEqual(true);

    act(() => {
      close();
    });

    expect(result.current.visible).toEqual(false);
  });
});
