import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import { vi } from "vitest";

// Mock CSS imports
vi.mock("*.css", () => ({}));

// Mock SVG imports
vi.mock("*.svg", () => ({
  default: "svg-module",
  ReactComponent: "svg",
}));

configure({
  asyncUtilTimeout: 10000,
});

/** Antd mocks */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => {
    const matches = query.includes("min-width: 992px"); // lg breakpoint
    const mediaQuery = {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn((listener) => {
        if (typeof listener === "function") {
          listener({
            matches,
            media: query,
          });
        }
      }),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, listener) => {
        if (event === "change" && typeof listener === "function") {
          listener({
            matches,
            media: query,
          });
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    return mediaQuery;
  }),
});

// ResizeObserver mock for Ant Design components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Properly setup TextEncoder/TextDecoder for Node.js environment
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

window.scroll = vi.fn();
window.alert = vi.fn();
