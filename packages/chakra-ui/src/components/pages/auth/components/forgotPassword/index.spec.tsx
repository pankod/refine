import React from "react";
import { pageForgotPasswordTests } from "@refinedev/ui-tests";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { ForgotPasswordPage } from ".";
import { MockAuthProvider, TestWrapper } from "@test/index";

describe("Auth Page Login", () => {
  pageForgotPasswordTests.bind(this)(ForgotPasswordPage);

  it("should run 'onSubmit' callback if it is passed", async () => {
    const onSubmit = vi.fn();

    const { getByText, getByLabelText } = render(
      <ForgotPasswordPage
        formProps={{
          onSubmit,
        }}
      />,
      {
        wrapper: TestWrapper({
          authProvider: MockAuthProvider,
        }),
      },
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "demo@refine.dev" },
    });

    fireEvent.click(getByText(/send reset instructions/i));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "demo@refine.dev",
    });
  });
});
