import React from "react";
import { vi } from "vitest";
import { pageLoginTests } from "@refinedev/ui-tests";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { LoginPage } from ".";
import { MockAuthProvider, TestWrapper } from "@test";

describe("Auth Page Login", () => {
  pageLoginTests.bind(this)(LoginPage);

  it("should run 'onSubmit' callback if it is passed", async () => {
    const onSubmit = vi.fn();

    const { getAllByText, getByLabelText } = render(
      <LoginPage
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

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "demo" },
    });

    fireEvent.click(getByLabelText(/remember me/i));

    fireEvent.click(getAllByText(/sign in/i)[1]);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "demo@refine.dev",
      password: "demo",
      remember: true,
    });
  });
});
