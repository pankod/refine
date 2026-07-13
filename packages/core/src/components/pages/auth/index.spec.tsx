import React from "react";
import { render } from "@testing-library/react";

import { AuthPage } from ".";
import { TestWrapper } from "@test/index";

describe("Auth Page Index", () => {
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
          expect(getByText(/update password/i)).toBeInTheDocument();
          break;
        default:
          expect(getByText(/Sign in to your account/i)).toBeInTheDocument();
          break;
      }
    },
  );
});
