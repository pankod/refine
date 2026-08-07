import React from "react";
import { pageUpdatePasswordTests } from "@refinedev/ui-tests";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { UpdatePasswordPage } from ".";
import { MockAuthProvider, TestWrapper } from "@test/index";

describe("Auth Page Update Password", () => {
  pageUpdatePasswordTests.bind(this)(UpdatePasswordPage);

  it("should run 'onSubmit' callback if it is passed", async () => {
    const onSubmit = vi.fn();

    const { getAllByText, getByLabelText, getAllByLabelText } = render(
      <UpdatePasswordPage
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

    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: "demo" },
    });

    fireEvent.change(getByLabelText(/confirm new password/i), {
      target: { value: "demo" },
    });

    fireEvent.click(getAllByText(/update/i)[0]);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      password: "demo",
      confirmPassword: "demo",
    });
  });
});
