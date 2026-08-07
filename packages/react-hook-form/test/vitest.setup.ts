import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import { vi } from "vitest";

configure({
  asyncUtilTimeout: 10000,
});

/** Material UI mocks */
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

// TextEncoder/TextDecoder globals for Node.js environment
if (typeof global !== "undefined") {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

window.scroll = vi.fn();
window.alert = vi.fn();
