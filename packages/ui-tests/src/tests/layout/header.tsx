import React from "react";

import type { AuthProvider } from "@refinedev/core";
import type { RefineLayoutHeaderProps } from "@refinedev/ui-types";

import { render, TestWrapper } from "@test";

const mockAuthProvider: AuthProvider = {
  check: () => Promise.resolve({ authenticated: true }),
  login: () => Promise.resolve({ success: true }),
  logout: () => Promise.resolve({ success: true }),
  onError: () => Promise.resolve({}),
  getPermissions: () => Promise.resolve(["admin"]),
  getIdentity: () =>
    Promise.resolve({ name: "username", avatar: "localhost:3000" }),
};

export const layoutHeaderTests = (
  HeaderElement: React.ComponentType<RefineLayoutHeaderProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Header Element", () => {
    it("should render successfull user name and avatar in header with authProvider", async () => {
      const { findByText, queryByRole, queryByAltText } = render(
        <HeaderElement />,
        {
          wrapper: TestWrapper({
            authProvider: mockAuthProvider,
          }),
        },
      );

      await findByText("username");
      const imgByRole = queryByRole("img", { queryFallbacks: true });
      const imgByAltText = queryByAltText("username");
      expect(imgByRole ?? imgByAltText).toHaveAttribute(
        "src",
        "localhost:3000",
      );
    });
  });
};
