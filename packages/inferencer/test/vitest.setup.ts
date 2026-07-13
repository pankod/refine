import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { TextEncoder, TextDecoder } from "util";

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

window.scroll = vi.fn();
window.alert = vi.fn();

// Improved TextEncoder/TextDecoder setup
if (typeof global.TextEncoder === "undefined") {
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
