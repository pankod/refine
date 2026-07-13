import React from "react";
import { vi } from "vitest";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test/index";

import { RegisterPage } from ".";
import type { AuthProvider } from "../../../../../contexts/auth/types";

const mockAuthProvider: AuthProvider = {
  login: async () => ({ success: true }),
  check: async () => ({ authenticated: true }),
  onError: async () => ({}),
  logout: async () => ({ success: true }),
};

describe("Auth Page Register", () => {
  it("should render card title", async () => {
    const { getByText } = render(<RegisterPage />, {
      wrapper: TestWrapper({}),
    });

    expect(getByText(/sign up for your account/i)).toBeInTheDocument();
  });

  it("should render card email and password input", async () => {
    const { getByLabelText } = render(<RegisterPage />, {
      wrapper: TestWrapper({}),
    });

    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should render providers", async () => {
    const { getByText, queryByText } = render(
      <RegisterPage
        providers={[
          {
            name: "Google",
            label: "Google",
          },
          {
            name: "Github",
          },
        ]}
      />,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(getByText(/google/i)).toBeInTheDocument();
    expect(queryByText(/github/i)).not.toBeInTheDocument();
  });

  it("should login link", async () => {
    const { getByRole } = render(<RegisterPage />, {
      wrapper: TestWrapper({}),
    });

    expect(
      getByRole("link", {
        name: /sign in/i,
      }),
    ).toBeInTheDocument();
  });

  it("should not render login link when is false", async () => {
    const { queryByRole } = render(<RegisterPage loginLink={false} />, {
      wrapper: TestWrapper({}),
    });

    expect(
      queryByRole("link", {
        name: /sign in/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should render sign up button", async () => {
    const { getByRole } = render(<RegisterPage />, {
      wrapper: TestWrapper({}),
    });

    expect(
      getByRole("button", {
        name: /sign up/i,
      }),
    ).toBeInTheDocument();
  });

  it("should renderContent only", async () => {
    const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
      render(
        <RegisterPage
          renderContent={() => <div data-testid="custom-content" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

    expect(queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    expect(
      queryByRole("button", {
        name: /sign up/i,
      }),
    ).not.toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
  });

  it("should customizable with renderContent", async () => {
    const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
      render(
        <RegisterPage
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
    expect(queryByLabelText(/email/i)).toBeInTheDocument();
    expect(queryByLabelText(/password/i)).toBeInTheDocument();
    expect(
      queryByRole("button", {
        name: /sign up/i,
      }),
    ).toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
  });

  it("should run register mutation when form is submitted", async () => {
    const registerMock = vi.fn();
    const { getByLabelText, getByDisplayValue } = render(<RegisterPage />, {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          register: registerMock,
        },
      }),
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "demo@refine.dev" },
    });

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "demo" },
    });

    fireEvent.click(getByDisplayValue(/sign up/i));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledTimes(1);
    });

    expect(registerMock).toHaveBeenCalledWith({
      email: "demo@refine.dev",
      password: "demo",
    });
  });

  it("should run register mutation when provider button is clicked", async () => {
    const registerMock = vi.fn();
    const { getByText } = render(
      <RegisterPage
        providers={[
          {
            name: "Google",
            label: "Google",
          },
        ]}
      />,
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            register: registerMock,
          },
        }),
      },
    );

    expect(getByText(/google/i)).toBeInTheDocument();

    fireEvent.click(getByText(/google/i));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledTimes(1);
    });

    expect(registerMock).toHaveBeenCalledWith({
      providerName: "Google",
    });
  });

  it("should not render form when `hideForm` is true", async () => {
    const { queryByLabelText, getByText, queryByRole } = render(
      <RegisterPage
        hideForm
        providers={[
          {
            name: "google",
            label: "Google",
          },
          { name: "github", label: "GitHub" },
        ]}
      />,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(
      queryByRole("link", {
        name: /forgot password/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole("button", {
        name: /sign up/i,
      }),
    ).not.toBeInTheDocument();

    expect(getByText(/google/i)).toBeInTheDocument();
    expect(getByText(/github/i)).toBeInTheDocument();
    expect(
      queryByRole("link", {
        name: /sign in/i,
      }),
    ).toBeInTheDocument();
  });

  it.each([true, false])("should has default links", async (hideForm) => {
    const { getByRole } = render(<RegisterPage hideForm={hideForm} />, {
      wrapper: TestWrapper({}),
    });
    expect(
      getByRole("link", {
        name: /sign in/i,
      }),
    ).toHaveAttribute("href", "/login");
  });

  it("should should accept 'mutationVariables'", async () => {
    const registerMock = vi.fn().mockResolvedValue({ success: true });

    const { getByRole, getByLabelText } = render(
      <RegisterPage
        mutationVariables={{
          foo: "bar",
          xyz: "abc",
        }}
      />,
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            register: registerMock,
          },
        }),
      },
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "demo@refine.dev" },
    });

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "demo" },
    });

    fireEvent.click(
      getByRole("button", {
        name: /sign up/i,
      }),
    );

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        foo: "bar",
        xyz: "abc",
        email: "demo@refine.dev",
        password: "demo",
      });
    });
  });
});
