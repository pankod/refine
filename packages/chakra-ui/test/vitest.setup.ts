import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import { vi } from "vitest";
import * as util from "util";

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

/** Chakra UI mocks */
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

window.scroll = vi.fn();
window.alert = vi.fn();

// Properly setup TextEncoder/TextDecoder for Node.js environment
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;
