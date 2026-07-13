import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import { vi, expect } from "vitest";

// Override toBeDisabled to also handle aria-disabled for non-form elements.
// MUI renders navigation buttons as <a> elements with component={LinkComponent},
// which use aria-disabled="true" instead of native disabled attribute.
expect.extend({
  toBeDisabled(received) {
    if (
      !(received instanceof HTMLElement) &&
      !(received instanceof SVGElement)
    ) {
      return {
        pass: this.isNot,
        message: () =>
          `received value must be an HTMLElement or an SVGElement.\nReceived has value: ${received}`,
      };
    }
    const element = received as HTMLElement;
    const isNativelyDisabled = element.hasAttribute("disabled");
    const isAriaDisabled = element.getAttribute("aria-disabled") === "true";

    return {
      pass: isNativelyDisabled || isAriaDisabled,
      message: () => {
        const clone = element.cloneNode(false) as HTMLElement;
        if (this.isNot) {
          return `expected element not to be disabled:\n\n${clone.outerHTML}`;
        }
        return `expected element to be disabled:\n\n${clone.outerHTML}`;
      },
    };
  },
});

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

// Properly setup TextEncoder/TextDecoder for Node.js environment
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

window.scroll = vi.fn();
window.alert = vi.fn();
