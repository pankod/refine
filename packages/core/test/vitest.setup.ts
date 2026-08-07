import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import { vi } from "vitest";
import { TextEncoder, TextDecoder } from "util";

// Configure testing library timeouts
configure({
  asyncUtilTimeout: 10000,
});

// Mock CSS imports to prevent import errors
vi.mock("*.css", () => ({}));

// Mock SVG imports
vi.mock("*.svg", () => ({
  default: "svg-module",
  ReactComponent: "svg",
}));

// ResizeObserver mock for components that use it
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

/** Antd and browser mocks */
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

// Improved TextEncoder/TextDecoder setup
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

Object.defineProperty(window, "TextEncoder", {
  writable: true,
  value: TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
  writable: true,
  value: TextDecoder,
});

window.scroll = vi.fn();
window.alert = vi.fn();

// Mock React 19 compatibility if needed
vi.mock("react-dom", async () => {
  const originalModule = await vi.importActual("react-dom");
  return {
    ...originalModule,
    render: vi.fn((element: any, container: any) => {
      if ((originalModule as any).createRoot && container) {
        const root = (originalModule as any).createRoot(container);
        root.render(element);
        return root;
      }
      return (originalModule as any).render?.(element, container);
    }),
  };
});
