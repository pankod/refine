import React, { type FC } from "react";
import type { AuthPageProps } from "@refinedev/core";

import { render, TestWrapper } from "@test";

export const authPageTests = (
  AuthPage: FC<AuthPageProps<any, any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Auth Page", () => {
    it.each(["register", "forgotPassword", "updatePassword", "login"] as const)(
      "should render %s type",
      async (type) => {
        const { getByText } = render(<AuthPage type={type} />, {
          wrapper: TestWrapper({}),
        });

        switch (type) {
          case "register":
            expect(getByText(/sign up for your account/i)).toBeInTheDocument();
            break;
          case "forgotPassword":
            expect(getByText(/forgot your password?/i)).toBeInTheDocument();
            break;
          case "updatePassword":
            expect(getByText(/update/i)).toBeInTheDocument();
            break;
          default:
            expect(getByText(/Sign in to your account/i)).toBeInTheDocument();
            break;
        }
      },
    );
  });
};
