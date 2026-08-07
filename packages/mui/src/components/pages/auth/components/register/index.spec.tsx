import React from "react";
import { vi } from "vitest";
import { pageRegisterTests } from "@refinedev/ui-tests";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { RegisterPage } from ".";
import { MockAuthProvider, TestWrapper } from "@test/index";

describe("Auth Page Register", () => {
  pageRegisterTests.bind(this)(RegisterPage);

  it("should run 'onSubmit' callback if it is passed", async () => {
    const onSubmit = vi.fn();

    const { getAllByText, getByLabelText } = render(
      <RegisterPage
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

    fireEvent.click(getAllByText(/sign up/i)[1]);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "demo@refine.dev",
      password: "demo",
    });
  });
});
