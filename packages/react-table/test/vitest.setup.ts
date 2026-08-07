import "@testing-library/jest-dom/vitest";
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
