import { vi } from "vitest";
import React, { type FC } from "react";

import {
  fireEvent,
  mockAuthProvider,
  mockRouterProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";
import type { LoginPageProps } from "@refinedev/core";

export const pageLoginTests = (
  LoginPage: FC<LoginPageProps<any, any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Login Page", () => {
    it("should render card title", async () => {
      const { getByText } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/sign in to your account/i)).toBeInTheDocument();
    });

    it("should render card email and password input", async () => {
      const { getByLabelText } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByLabelText(/email/i)).toBeInTheDocument();
      expect(getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("should render providers", async () => {
      const { getByText } = render(
        <LoginPage
          providers={[
            {
              name: "Google",
              label: "Google",
            },
            {
              name: "Github",
              label: "Github",
            },
          ]}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByText(/google/i)).toBeInTheDocument();
      expect(getByText(/github/i)).toBeInTheDocument();
    });

    it("should register link", async () => {
      const { getByRole } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(
        getByRole("link", {
          name: /sign up/i,
        }),
      ).toBeInTheDocument();
    });

    it("should not render register link when is false", async () => {
      const { queryByRole } = render(<LoginPage registerLink={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(
        queryByRole("link", {
          name: /sign up/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("should forgotPassword link", async () => {
      const { getByRole } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(
        getByRole("link", {
          name: /forgot password?/i,
        }),
      ).toBeInTheDocument();
    });

    it("should not render forgotPassword link when is false", async () => {
      const { queryByRole } = render(<LoginPage forgotPasswordLink={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(
        queryByRole("link", {
          name: /forgot password/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("should render remember me", async () => {
      const { queryByRole } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(
        queryByRole("checkbox", {
          name: /remember me/i,
        }),
      ).toBeInTheDocument();
    });

    it("should not render remember me when is false", async () => {
      const { queryByRole } = render(<LoginPage rememberMe={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(
        queryByRole("checkbox", {
          name: /remember me/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("should render sign in button", async () => {
      const { getByRole } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(
        getByRole("button", {
          name: /sign in/i,
        }),
      ).toBeInTheDocument();
    });

    it("should render default <ThemedTitle> with icon", async () => {
      const { getByText, getByTestId } = render(<LoginPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/refine project/i)).toBeInTheDocument();
      expect(getByTestId("refine-logo")).toBeInTheDocument();
    });

    it("should render custom title", async () => {
      const { queryByText, queryByTestId } = render(
        <LoginPage title="Custom Title" />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByText(/custom title/i)).toBeInTheDocument();
      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
      expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    });

    it("should not render title when is false", async () => {
      const { queryByText } = render(<LoginPage title={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    });

    it("should pass contentProps", async () => {
      const { getByTestId } = render(
        <LoginPage contentProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should pass wrapperProps", async () => {
      const { getByTestId } = render(
        <LoginPage wrapperProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should renderContent only", async () => {
      const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
        render(
          <LoginPage
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
          name: /sign in/i,
        }),
      ).not.toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
    });

    it("should customizable with renderContent", async () => {
      const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
        render(
          <LoginPage
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
      expect(queryByText(/refine project/i)).toBeInTheDocument();
      expect(queryByTestId("refine-logo")).toBeInTheDocument();
      expect(
        queryByRole("button", {
          name: /sign in/i,
        }),
      ).toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
    });

    it("should run login mutation when form is submitted", async () => {
      const loginMock = vi.fn().mockResolvedValue({ success: true });
      const { getByLabelText, getAllByText } = render(<LoginPage />, {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            login: loginMock,
          },
        }),
      });

      fireEvent.change(getByLabelText(/email/i), {
        target: { value: "demo@refine.dev" },
      });

      fireEvent.change(getByLabelText(/password/i), {
        target: { value: "demo" },
      });

      fireEvent.click(getByLabelText(/remember me/i));

      fireEvent.click(getAllByText(/sign in/i)[1]);

      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledTimes(1);
      });

      expect(loginMock).toHaveBeenCalledWith({
        email: "demo@refine.dev",
        password: "demo",
        remember: true,
      });
    });

    it("should work with new router provider Link", async () => {
      vi.spyOn(console, "error").mockImplementation((message) => {
        console.warn(message);
      });

      const { getByText } = render(<LoginPage />, {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({}),
        }),
      });

      const forgotPasswordLink = getByText(/forgot password/i);
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink.getAttribute("href")).toBe("/forgot-password");

      const registerLink = getByText(/sign up/i);
      expect(registerLink).toBeInTheDocument();
      expect(registerLink.getAttribute("href")).toBe("/register");
    });

    it("should run login mutation when provider button is clicked", async () => {
      const loginMock = vi.fn().mockResolvedValue({ success: true });
      const { getByText } = render(
        <LoginPage
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
              login: loginMock,
            },
          }),
        },
      );

      expect(getByText(/google/i)).toBeInTheDocument();

      fireEvent.click(getByText(/google/i));

      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledTimes(1);
      });

      expect(loginMock).toHaveBeenCalledWith({
        providerName: "Google",
      });
    });

    it("should not render form when `hideForm` is true", async () => {
      const { queryByLabelText, getByText, queryByRole } = render(
        <LoginPage
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
      expect(queryByLabelText(/remember/i)).not.toBeInTheDocument();
      expect(
        queryByRole("link", {
          name: /forgot password/i,
        }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole("button", {
          name: /sign in/i,
        }),
      ).not.toBeInTheDocument();

      expect(getByText(/google/i)).toBeInTheDocument();
      expect(getByText(/github/i)).toBeInTheDocument();
      expect(
        queryByRole("link", {
          name: /sign up/i,
        }),
      ).toBeInTheDocument();
    });

    it.each([true, false])("should has default links", async (hideForm) => {
      const { getByRole } = render(<LoginPage hideForm={hideForm} />, {
        wrapper: TestWrapper({}),
      });
      expect(
        getByRole("link", {
          name: /sign up/i,
        }),
      ).toHaveAttribute("href", "/register");

      if (hideForm === false) {
        expect(
          getByRole("link", {
            name: /forgot password/i,
          }),
        ).toHaveAttribute("href", "/forgot-password");
      }
    });

    it("should should accept 'mutationVariables'", async () => {
      const loginMock = vi.fn().mockResolvedValue({ success: true });

      const { getByRole, getByLabelText } = render(
        <LoginPage
          mutationVariables={{
            foo: "bar",
            xyz: "abc",
          }}
        />,
        {
          wrapper: TestWrapper({
            authProvider: {
              ...mockAuthProvider,
              login: loginMock,
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
          name: /sign in/i,
        }),
      );

      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith({
          foo: "bar",
          xyz: "abc",
          email: "demo@refine.dev",
          password: "demo",
          remember: false,
        });
      });
    });
  });
};
