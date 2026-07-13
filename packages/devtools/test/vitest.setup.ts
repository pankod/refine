import "@testing-library/jest-dom/vitest";
import * as util from "util";
import { vi } from "vitest";

/** Antd mocks */
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

Object.defineProperty(window, "TextEncoder", {
  writable: true,
  value: util.TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
  writable: true,
  value: util.TextDecoder,
});

window.scroll = vi.fn();
window.alert = vi.fn();
