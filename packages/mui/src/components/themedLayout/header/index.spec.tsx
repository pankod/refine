import React from "react";
import { render, TestWrapper, waitFor } from "@test";
import { ThemedHeader } from "./index";
import type { AuthProvider } from "@refinedev/core";

const mockAuthProvider: AuthProvider = {
  login: () =>
    Promise.resolve({
      success: true,
    }),
  logout: () =>
    Promise.resolve({
      success: true,
    }),
  onError: () => Promise.resolve({}),
  check: () =>
    Promise.resolve({
      authenticated: true,
    }),
  getIdentity: () =>
    Promise.resolve({ name: "John Doe", avatar: "localhost:3000" }),
};

describe("ThemedHeader", () => {
  it("should render successfull user name and avatar fallback in header", async () => {
    const { getByTestId, container } = render(<ThemedHeader />, {
      wrapper: TestWrapper({
        authProvider: mockAuthProvider,
      }),
    });

    await waitFor(() => {
      expect(getByTestId("header-user-name")).toHaveTextContent("John Doe");
      expect(container.querySelector("img")).toHaveAttribute(
        "src",
        "localhost:3000",
      );
    });
  });

  it("should only render user name in header", async () => {
    const { getByTestId, container } = render(<ThemedHeader />, {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          getIdentity: () => Promise.resolve({ name: "John Doe" }),
        },
      }),
    });

    await waitFor(() => {
      expect(getByTestId("header-user-name")).toHaveTextContent("John Doe");
      expect(container.querySelector("img")).not.toBeInTheDocument();
    });
  });

  it("should only render user avatar in header", async () => {
    const { queryByTestId, container } = render(<ThemedHeader />, {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          getIdentity: () => Promise.resolve({ avatar: "localhost:3000" }),
        },
      }),
    });

    await waitFor(() => {
      expect(container.querySelector("img")).toHaveAttribute(
        "src",
        "localhost:3000",
      );
      expect(queryByTestId("header-user-name")).not.toBeInTheDocument();
    });
  });
});
