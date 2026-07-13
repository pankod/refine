import React from "react";
import { TestWrapper, render } from "@test/index";
import { Link } from "./index";

describe("Link", () => {
  describe("with `to`", () => {
    it("should render a tag without router provider", () => {
      const { getByText } = render(<Link to="/test">Test</Link>);

      const link = getByText("Test");
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/test");
    });

    it("should render a tag with router provider", () => {
      const { getByTestId } = render(
        <Link<{ foo: "bar" }> foo="bar" to="/test" aria-label="test-label">
          Test
        </Link>,
        {
          wrapper: TestWrapper({
            routerProvider: {
              Link: ({ to, children, ...props }) => (
                <a href={to} data-testid="test-link" {...props}>
                  {children}
                </a>
              ),
            },
          }),
        },
      );

      const link = getByTestId("test-link");
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/test");
      expect(link.getAttribute("aria-label")).toBe("test-label");
      expect(link.getAttribute("foo")).toBe("bar");
    });

    it("should prioritize 'to' over 'go' when both are provided", () => {
      const { getByText } = render(
        <Link to="/with-to" go={{ to: "/with-go" }}>
          Test
        </Link>,
      );

      const link = getByText("Test");
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/with-to");
    });
  });

  describe("with `go`", () => {
    it("should render a tag go.to as object", () => {
      const { getByTestId } = render(
        <Link
          go={{
            to: {
              resource: "test",
              action: "show",
              id: 1,
            },
            options: { keepQuery: true },
          }}
          aria-label="test-label"
        >
          Test
        </Link>,
        {
          wrapper: TestWrapper({
            resources: [{ name: "test", show: "/test/:id" }],
            routerProvider: {
              go: () => () => {
                return "/test/1";
              },
              Link: ({ to, children, ...props }) => (
                <a href={to} data-testid="test-link" {...props}>
                  {children}
                </a>
              ),
            },
          }),
        },
      );

      const link = getByTestId("test-link");
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/test/1");
      expect(link.getAttribute("aria-label")).toBe("test-label");
    });

    it("should render a tag go.to as string", () => {
      const { getByTestId } = render(
        <Link
          go={{
            to: "/test/1",
          }}
          aria-label="test-label"
        >
          Test
        </Link>,
        {
          wrapper: TestWrapper({
            routerProvider: {
              go: () => () => {
                return "/test/1";
              },
              Link: ({ to, children, ...props }) => (
                <a href={to} data-testid="test-link" {...props}>
                  {children}
                </a>
              ),
            },
          }),
        },
      );

      const link = getByTestId("test-link");
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/test/1");
      expect(link.getAttribute("aria-label")).toBe("test-label");
    });
  });
});
