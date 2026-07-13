import { vi } from "vitest";
import { getLocalStorage } from "./local-storage";

describe("getLocalStorage", () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return default value if localStorage is not available", () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error("test error");
    });
    const defaultValue = "default";
    const value = getLocalStorage("test", defaultValue);
    expect(value).toEqual(defaultValue);
  });

  it("should return the value from localStorage if available", () => {
    const name = "test";
    const value = "value";
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(value));
    const result = getLocalStorage(name, "default");
    expect(result).toEqual(value);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(name);
  });

  it("should return default value if localStorage throws an error", () => {
    const defaultValue = "default";
    const name = "test";
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error("test error");
    });
    const result = getLocalStorage(name, defaultValue);
    expect(result).toEqual(defaultValue);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(name);
  });
});
