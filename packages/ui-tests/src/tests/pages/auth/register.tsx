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
import type { RegisterPageProps } from "@refinedev/core";

export const pageRegisterTests = (
  RegisterPage: FC<RegisterPageProps<any, any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Register Page", () => {
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
      const { getByText } = render(
        <RegisterPage
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

    it("should render default <ThemedTitle> with icon", async () => {
      const { getByText, getByTestId } = render(<RegisterPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/refine project/i)).toBeInTheDocument();
      expect(getByTestId("refine-logo")).toBeInTheDocument();
    });

    it("should render custom title", async () => {
      const { queryByText, queryByTestId } = render(
        <RegisterPage title="Custom Title" />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByText(/custom title/i)).toBeInTheDocument();
      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
      expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    });

    it("should not render title when is false", async () => {
      const { queryByText } = render(<RegisterPage title={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    });

    it("should pass contentProps", async () => {
      const { getByTestId } = render(
        <RegisterPage contentProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should pass wrapperProps", async () => {
      const { getByTestId } = render(
        <RegisterPage wrapperProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
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
      expect(queryByText(/refine project/i)).toBeInTheDocument();
      expect(queryByTestId("refine-logo")).toBeInTheDocument();
      expect(
        queryByRole("button", {
          name: /sign up/i,
        }),
      ).toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
    });

    it("should run register mutation when form is submitted", async () => {
      const registerMock = vi.fn().mockResolvedValue({ success: true });
      const { getByLabelText, getAllByText } = render(<RegisterPage />, {
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

      fireEvent.click(getAllByText(/sign up/i)[1]);

      await waitFor(() => {
        expect(registerMock).toHaveBeenCalledTimes(1);
      });

      expect(registerMock).toHaveBeenCalledWith({
        email: "demo@refine.dev",
        password: "demo",
      });
    });

    it("should run register mutation when provider button is clicked", async () => {
      const registerMock = vi.fn().mockResolvedValue({ success: true });
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

    it("should work with new router provider Link", async () => {
      vi.spyOn(console, "error").mockImplementation((message) => {
        console.warn(message);
      });

      const { getByText } = render(<RegisterPage />, {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({}),
        }),
      });

      const loginLink = getByText(/sign in/i);
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/login");
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
};
