import React from "react";
import { vi } from "vitest";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test/index";

import { UpdatePasswordPage } from ".";
import type { AuthProvider } from "../../../../../contexts/auth/types";

const mockAuthProvider: AuthProvider = {
  login: async () => ({ success: true }),
  check: async () => ({ authenticated: true }),
  onError: async () => ({}),
  logout: async () => ({ success: true }),
};

describe("Auth Page Update Password", () => {
  it("should render card title", async () => {
    const { getByText } = render(<UpdatePasswordPage />, {
      wrapper: TestWrapper({}),
    });

    expect(getByText(/Update Password?/i)).toBeInTheDocument();
  });

  it("should render password input", async () => {
    const { getByLabelText } = render(<UpdatePasswordPage />, {
      wrapper: TestWrapper({}),
    });

    expect(getByLabelText("New Password")).toBeInTheDocument();
    expect(getByLabelText("Confirm New Password")).toBeInTheDocument();
  });

  it("should renderContent only", async () => {
    const { queryByText, queryByTestId, queryByLabelText } = render(
      <UpdatePasswordPage
        renderContent={() => <div data-testid="custom-content" />}
      />,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    expect(queryByLabelText("New Password")).not.toBeInTheDocument();
    expect(queryByLabelText("Confirm New Password")).not.toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
  });

  it("should customizable with renderContent", async () => {
    const { queryByText, queryByTestId, getByLabelText } = render(
      <UpdatePasswordPage
        renderContent={(content: any, title: any) => (
          <div>
            {title}
            <div data-testid="custom-content">
              <div>Custom Content</div>
            </div>
            {content}
          </div>
        )}
      />,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(queryByText(/custom content/i)).toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
    expect(getByLabelText("New Password")).toBeInTheDocument();
    expect(getByLabelText("Confirm New Password")).toBeInTheDocument();
  });

  it("should run updatePassword mutation when form is submitted", async () => {
    const updatePasswordMock = vi.fn();
    const { getAllByLabelText, getByLabelText, getByDisplayValue } = render(
      <UpdatePasswordPage />,
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            updatePassword: updatePasswordMock,
          },
        }),
      },
    );

    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: "demo" },
    });

    fireEvent.change(getByLabelText(/confirm new password/i), {
      target: { value: "demo" },
    });

    fireEvent.click(getByDisplayValue(/update/i));

    await waitFor(() => {
      expect(updatePasswordMock).toHaveBeenCalledTimes(1);
    });

    expect(updatePasswordMock).toHaveBeenCalledWith({
      password: "demo",
      confirmPassword: "demo",
    });
  });

  it("should should accept 'mutationVariables'", async () => {
    const updatePasswordMock = vi.fn().mockResolvedValue({ success: true });

    const { getByRole, getByLabelText, getAllByLabelText } = render(
      <UpdatePasswordPage
        mutationVariables={{
          foo: "bar",
          xyz: "abc",
        }}
      />,
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            updatePassword: updatePasswordMock,
          },
        }),
      },
    );

    fireEvent.change(getAllByLabelText(/password/i)[0], {
      target: { value: "demo" },
    });

    fireEvent.change(getByLabelText(/confirm new password/i), {
      target: { value: "demo" },
    });

    fireEvent.click(
      getByRole("button", {
        name: /update/i,
      }),
    );

    await waitFor(
      () => {
        expect(updatePasswordMock).toHaveBeenCalledWith({
          foo: "bar",
          xyz: "abc",
          password: "demo",
          confirmPassword: "demo",
        });
      },
      { timeout: 500 },
    );
  });
});
