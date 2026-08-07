import React from "react";
import { vi } from "vitest";

import {
  MockJSONServer,
  TestWrapper,
  mockRouterProvider,
  renderHook,
  render,
} from "@test";
import { useLink } from "./";
import "../../../components/link";

vi.mock("../../../components/link", () => ({
  Link: vi.fn().mockReturnValue(<div data-testid="mocked-link" />),
}));

describe("useLink Hook", () => {
  it("should return Link component", () => {
    const { result } = renderHook(() => useLink(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider(),
      }),
    });

    const Component = result.current;

    const { getByTestId } = render(<Component to="posts" />);
    expect(getByTestId("mocked-link")).toBeInTheDocument();
  });
});
