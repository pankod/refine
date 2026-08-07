import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./use-local-storage";
import { getLocalStorage, setLocalStorage } from "../utils/local-storage";

vi.mock("../utils/local-storage");

describe("useLocalStorage", () => {
  const name = "test";
  const defaultValue = "default";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the default value if localStorage is empty", () => {
    (getLocalStorage as vi.Mock).mockReturnValueOnce(defaultValue);
    const { result } = renderHook(() =>
      useLocalStorage({ name, defaultValue }),
    );
    expect(result.current[0]).toEqual(defaultValue);
  });

  it("should return the value from localStorage if available", () => {
    const value = "value";
    (getLocalStorage as vi.Mock).mockReturnValueOnce(value);
    const { result } = renderHook(() =>
      useLocalStorage({ name, defaultValue }),
    );
    expect(result.current[0]).toEqual(value);
  });

  it("should update the value in localStorage when setValue is called", () => {
    const value = "value";
    const { result } = renderHook(() =>
      useLocalStorage({ name, defaultValue }),
    );
    act(() => {
      result.current[1](value);
    });
    expect(setLocalStorage).toHaveBeenCalledWith(name, value);
  });
});
